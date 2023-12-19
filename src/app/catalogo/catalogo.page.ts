import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  constructor(private http: HttpClient) { }

  public cortes : any;

  ngOnInit() {

    this.http.get('http://localhost:3000/cortes').subscribe((response:any) => {
      console.log(response);
    this.cortes = response;

    });

  }




}
