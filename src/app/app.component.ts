import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Catalogo', url: 'catalogo', icon: 'person' },
    { title: 'Citas', url: 'citas', icon: 'paper-plane' },
    { title: 'Info', url: 'info', icon: 'heart' },

  ];

  constructor() {}
}
