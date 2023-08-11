import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/service/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor( 
    private spotifyService: SpotifyService,
    private router: Router
    ){}

    ngOnInit():void{
      this.checkTokenUrlCallback();

    }
    checkTokenUrlCallback() {
      const token = this.spotifyService.obtainTokenUrlCallback();
      if(token){
        this.spotifyService.defineAccessToken(token);
        this.router.navigate(['/']);
      }
    }
    openLogin(){
      window.location.href = this.spotifyService.obtainUrlLogin();
    }

}
