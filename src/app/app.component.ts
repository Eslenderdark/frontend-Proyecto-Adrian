import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Catalogo', url: 'catalogo', icon: 'person', login_hide:true },
    { title: 'Calendario', url: 'calendario', icon: 'person', login_hide:true },
    { title: 'Información', url: 'info', icon: 'person', login_hide:true }
  ];

  constructor(public auth: AuthService) {}
}
