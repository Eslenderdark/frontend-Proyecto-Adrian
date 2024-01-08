import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  constructor(private http: HttpClient, private alertController: AlertController) { }

  public cortes: any;

  ngOnInit() {

    this.http.get('http://localhost:3000/cortes').subscribe((response: any) => {
      console.log(response);
      this.cortes = response;

    });

  }

  async mostrarinfo(corte: any) {
    const alert = await this.alertController.create({

      header: corte.name,
      subHeader: corte.precio + "€",
      message: `Tipo de peinado/corte es: ${corte.tipo_de_pelo}
       Tiempo estimado en hacer el peinado/corte es de: ${corte.tiempo_estimado} minutos`,
      buttons: ['Cerrar']
    });
    await alert.present();
  }
}