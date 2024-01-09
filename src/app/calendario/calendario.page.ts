import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  constructor(private alertController: AlertController, private activatedRoute: ActivatedRoute) { }

  public mensaje: any;

  ngOnInit() {
    //Al entrar a la pagina sale la alerta
    this.mostrarAlerta('Ponga su nombre y seleccione un dia');

  }
  //Esto es el calendario, Dias y Horas
  Mes: Date = new Date();
  DiaSemana: string[] = ['Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sab', 'Dom'];
  Horas: string[] = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'];

  //Esto sirve para que cuandoel usuario haga click en alguna casilla, en la consola diga el dia y la hora de donde a clicado
  seleccionarDia(hour: string, day: string) {
    console.log(`Selected: ${day}, ${hour}`);
  }

  //Esto es la alerte, el header es el titulo de la alerte, en este caso "Ponga su nombre y seleccione un dia"
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: mensaje,
      buttons: [{
        text: 'OK',
        handler: (nombreUsuario) => { 
          console.log(nombreUsuario);
        }
      }],
      inputs: [{ placeholder: 'Nombre' }]
    });

    //Muestra la alerta en la pagina
    await alert.present();
  }
}