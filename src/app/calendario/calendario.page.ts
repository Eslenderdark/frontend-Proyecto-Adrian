import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  Mes: Date = new Date();
  DiaSemana: string[] = [ 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sab','Dom'];
  Horas: string[] = ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];

  selectDay(hour: string, day: string) {
    // Implementa la lógica de selección de día aquí
    console.log(`Selected: ${day}, ${hour}`);
  }

  async seleccionarDia(hora: string, dia: string) {
    const alert = await this.alertController.create({
      header: 'Ingrese su nombre',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          },
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            console.log(`Nombre seleccionado: ${data.nombre}`);
          },
        },
      ],
    });
    await alert.present();
  }
}
