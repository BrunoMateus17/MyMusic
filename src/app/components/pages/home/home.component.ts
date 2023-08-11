import { Component,OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from 'src/app/service/spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private spotifyService: SpotifyService){

  }
  musicas: [] = [];
  faPlay = faPlay;
  ngOnInit(): void {
    this.obterMusicas();
    // this.obterMusicaAtual();
  }
  async obterMusicas() {
    await this.spotifyService.initUser();
    this.musicas = await this.spotifyService.buscarMusicas();
    console.log(this.musicas)
  }
  ngOnDestroy(): void {
    // this.subs.forEach(sub => sub.unsubscribe());
  }
  async executeMusic(musica:any){
    // await this.spotifyService.initUser();
    console.log(musica.id)

    await this.spotifyService.executeMusic(musica.id);
  }
  
}
