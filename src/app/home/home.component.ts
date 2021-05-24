import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import {  GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Observable } from 'rxjs';
import { ApiService } from '../Services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService : SocialAuthService, private router : Router,private api : ApiService) { }

  logtext : string = "You are not logged in click google to login";
  user: SocialUser;
  loggedIn: boolean;
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      console.log(user)
      this.user = user;

      this.api.idtoken = this.user.idToken;
      if (this.api.idtoken != "") {
        this.logtext = "you are logged in click signout to sign out";
      }
      else
      {
        this.logtext = "You are not logged in click google to login";
      }

    });
    

  }
  loginWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['info']));
  }
  singout(): void {
    this.api.idtoken = "";
    this.logtext = "You are not logged in click google to login";
    this.authService.signOut();

  }  

 
  



}
