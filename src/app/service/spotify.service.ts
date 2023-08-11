import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { Router } from '@angular/router';
import { SpotifyUser } from 'src/common/spotify';
import { addMilliseconds, format } from "date-fns";




@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotifyApi: any;
  usuario: any;


  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async initUser() {
    if(!!this.usuario)
      return true;

    const token = localStorage.getItem('token');

    if(!token)
      return false;

    try {

      this.defineAccessToken(token);
      await this.obtainSpotifyUser();
      return !!this.usuario;

    }catch(ex){
      return false;
    }
  }

  async obtainSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUser(userInfo);
  }

  obtainUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType; 
  }

  obtainTokenUrlCallback() {
    if (!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  defineAccessToken(token: string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }



  async buscarMusicas(offset=0, limit=50){
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musicas.items.map((x:any) =>{
      const data = addMilliseconds(new Date(0), x.track.duration_ms);
      return {
        id: x.track.uri,
        album: {
          id: x.track.album.id,
          imagemUrl: x.track.album.images,
          nome: x.track.album.name,
        },
        artistas: [x.track.artists],
        tempo: format(data, 'mm:ss'),
        titulo: x.track.name
      }
    });
  }

  async executeMusic(musicaId:string){
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

}
