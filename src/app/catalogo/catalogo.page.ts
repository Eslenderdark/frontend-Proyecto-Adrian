import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  constructor(public auth: AuthService, private http: HttpClient, private alertController: AlertController, private router: Router) { }

  public cortes: any;
  public user: any;
  public datos_user: any;
  public nuevoPeinado = {
    name:'',
    tipo_de_pelo: '',
    tiempo_estimado: '',
    precio: '',
    url: ''
  };

  ngOnInit() {

    // Carga la informacion de usuario desde un auth
    this.auth.user$.subscribe((data) => {
      this.user = data
      console.log(this.user);
      this.http.get(environment.backend_host + '/cliente/' + this.user.email).subscribe((response: any) => {
        console.log(response);
        this.datos_user = response;
      });
    });

    this.http.get(environment.backend_host + '/cortes').subscribe((response: any) => {
      console.log(response);
      this.cortes = response;
    });
  }

  // Muestra información del corte al hacer click en la tarjeta
  async mostrarInfo(corte: any) {
    const alert = await this.alertController.create({
      header: corte.name,
      subHeader: corte.precio + "€",
      message: `Tipo de peinado/corte es: ${corte.tipo_de_pelo}
       Tiempo estimado en hacer el peinado/corte es de: ${corte.tiempo_estimado} minutos`,

      // Al hacerl click aparte de la info sale 2 botones

      // Cierra el alert
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

  async addPeinado() {
    console.log("Funcioa addPeinado ejecutado");
  
    const alert = await this.alertController.create({
      header: `Rellene el formulario`,
      inputs: [
        {
          type: 'text',
          placeholder: 'Name',
          name: 'name'
        },
        {
          type: 'text',
          placeholder: 'Tipo de pelo',
          name: 'tipo_de_pelo'
        },
        {
          type: 'number',
          placeholder: 'Tiempo estimado',
          name: 'tiempo_estimado'
        },
        {
          type: 'number',
          placeholder: 'Precio',
          name: 'precio'
        },
        {
          type: 'url',
          placeholder: 'Url',
          name: 'url'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelando');
          }
        },
        {
          text: 'Guardar',
          handler: (formData) => {
            this.guardarNuevoPeinado(formData);
          }
        }
      ]
    });
    await alert.present();
  }

  guardarNuevoPeinado(PeinadoNew: any) {
    // Guarda los datos del nuevo peinado en la variable
    this.nuevoPeinado.name = PeinadoNew.name;
    this.nuevoPeinado.tipo_de_pelo = PeinadoNew.tipo_de_pelo;
    this.nuevoPeinado.tiempo_estimado = PeinadoNew.tiempo_estimado;
    this.nuevoPeinado.precio = PeinadoNew.precio;
    this.nuevoPeinado.url = PeinadoNew.url;
  
    // Envía los datos del nuevo peinado al backend para su almacenamiento
    this.http.post(environment.backend_host + '/cortes', this.nuevoPeinado).subscribe(
      (response) => {
        console.log('Nuevo peinado guardado:', response);
      },
      (error) => {
        console.error('Error al guardar nuevo peinado:', error);
      }
    );
    window.location.reload();

  }
  
  async borrar_corte(name: any) {
    console.log("Corte")
    console.log(name)
    this.http.delete(environment.backend_host + '/cortes/' + name).subscribe(
      (response: any) => {
        console.log('Respuesta del backend eliminar', response);
        window.location.reload();
      },
      (error: any) => {
        console.error('Error al eliminar corte:', error);
      }
    );
    window.location.reload();

  }
  


  }
