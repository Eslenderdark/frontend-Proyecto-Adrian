import { Component, OnInit,Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( @Inject(DOCUMENT) public document: Document,public auth: AuthService) {}

  ngOnInit() {
  }

  login() {
    this.auth.loginWithRedirect({
      appState: {
        target: '/catalogo'
      }
    });
  }

    logout() {
      this.auth.logout({ 
        logoutParams: {
          returnTo: this.document.location.origin 
        }
      });
  }

}