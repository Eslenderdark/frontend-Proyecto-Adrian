import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  constructor(public auth: AuthService, private http: HttpClient, private alertController: AlertController, private router: Router) { }

  public cortes: any;
  public user: any;

  ngOnInit() {

    // Carga la informacion de usuario desde un auth
    this.auth.user$.subscribe((data) => {
      this.user = data
      console.log(this.user);
    });

    this.http.get('http://localhost:3000/cortes').subscribe((response: any) => {
      console.log(response);
      this.cortes = response;
    });
  }

  //Muestra información del corte al hacer click en la tarjeta
  async mostrarInfo(corte: any) {
    const alert = await this.alertController.create({
      header: corte.name,
      subHeader: corte.precio + "€",
      message: `Tipo de peinado/corte es: ${corte.tipo_de_pelo}
       Tiempo estimado en hacer el peinado/corte es de: ${corte.tiempo_estimado} minutos`,

      //Al hacerl click aparte de la info sale 2 botones

      //Cierra el alert
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          },
        },
        //Este te manda a la pagina de "Calendario"
        {
          text: 'Seleccionar día',
          handler: () => {

            this.router.navigate(['/calendario', { corte_seleccionado: JSON.stringify(corte) }]);

          },
        },
      ],
    });
    await alert.present();
  }
}
