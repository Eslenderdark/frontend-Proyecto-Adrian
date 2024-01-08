import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  Mes: Date = new Date();
  DiaSemana: string[] = [ 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sab','Dom'];
  Horas: string[] = ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];

  selectDay(hour: string, day: string) {
    // Implementa la lógica de selección de día aquí
    console.log(`Selected: ${day}, ${hour}`);
  }



}
