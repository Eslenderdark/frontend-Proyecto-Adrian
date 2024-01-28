import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  constructor(private alertController: AlertController, private activatedRoute: ActivatedRoute, public auth: AuthService, private http: HttpClient) { }

  public mensaje: any;
  public corte_seleccionado: any;
  public nombreUsuario: any;
  public nombre_usuario: any;
  public calendario: any;
  public corte: any;
  public celda: any;
  public user: any;
  public dia: any;
  public precio: any;
  public botonActivo: boolean = false;
  public seleccionRealizada: boolean = false;

  //Esto es el calendario, Dias y Horas
  public Mes: Date = new Date();
  public DiaSemana: string[] = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  public Horas: string[] = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'];
  public citas: any[][] = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
  ]

  ngOnInit() {

    // Carga la informacion de usuario desde un auth
    this.auth.user$.subscribe((data) => {
      this.user = data
      console.log(this.user);
    });

    // Recuperar citas y recuperarla
    this.http.get('http://localhost:3000/citas').subscribe((response: any) => {
        console.log('Respuesta del backend:', response);
        response.forEach((cita: any) =>{
          this.citas[cita.row_index][cita.col_index] = cita.nombre + " " + cita.name;
        })
      
      },
      (error) => {
        console.error('Error al enviar datos al backend:', error);
      }
    );

    this.corte = JSON.parse(this.activatedRoute.snapshot.paramMap.get('corte_seleccionado') as string);
    console.log(this.corte)
    if (this.corte != null) {
      this.mostrarAlerta('Ponga su nombre y seleccione un dia');
    }

  }

  //Esto sirve para que cuando el usuario haga click en alguna casilla, en la consola diga el dia y la hora de donde a clicado
  seleccionarDia(hour: string, day: string) {
    console.log(`Dia y hora selecionada: ${day}, ${hour}`);
  }

  //Esto es la alerte, el header es el titulo de la alerte, en este caso "Ponga su nombre y seleccione un dia"
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: mensaje,
      buttons: [{
        text: 'OK',
        handler: (nombreUsuario) => {
          console.log(nombreUsuario);
          this.nombre_usuario = nombreUsuario[0];
        }
      }],
      inputs: [{ placeholder: 'Nombre' }]
    });

    //Muestra la alerta en la pagina
    await alert.present();
  }

  clickCeldaCalendario(hora: string, dia: string, i: number, j: number) {
    if (!this.seleccionRealizada) {
      console.log("Hora " + hora);
      console.log("dia " + dia);
      console.log("corte " + JSON.stringify(this.corte));

      console.log(`Celda seleccionada: ${dia}, ${hora}`);
      const cita = {
        hora: hora,
        dia: dia,
        precio: this.corte.precio,
        id_corte: this.corte.id,
        id_cliente: this.user.email,
        col_index: j,
        row_index: i,
        nombre: this.nombre_usuario
      };
      this.citas[i][j] = this.nombre_usuario + " " + this.corte.name

      this.http.post('http://localhost:3000/citas', cita).subscribe(
        (response) => {
          console.log('Respuesta del backend:', response);
          this.botonActivo = true;
          this.seleccionRealizada = true;
        },
        (error) => {
          console.error('Error al enviar datos al backend:', error);
        }
      );
    } else {
      alert('Ya has elegido un día. No se permiten selecciones adicionales.');
    }

  
  }

}