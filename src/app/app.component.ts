import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Catalogo', url: 'catalogo', icon: 'person' },
    { title: 'Calendario', url: 'calendario', icon: 'person' },
    { title: 'Información', url: 'info', icon: 'person' }
  ];

  constructor() {}
}
