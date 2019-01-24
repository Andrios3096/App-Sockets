import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
import { Subscription } from 'rxjs';

import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  
texto = '';

  
  suscripcion: Subscription;
  arrayHeroes:any=[]

  constructor(public _WebsocketService: WebsocketService,
    public _ChatService:ChatService,
    public _HttpClient:HttpClient
    ) { }

  ngOnInit(){

    this.getData();
    this.obtenerMensaje();

    this.arrayHeroes = []

    let a = this._ChatService.getHeros().subscribe(heroe => {

      this.arrayHeroes = heroe

    a.unsubscribe

    });
    
  }

  obtenerMensaje(){
    this._ChatService.obtenerMensaje().subscribe(mensaje =>{
      console.log(mensaje);
      
    })
  }

  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }

  // enviar un heroe al servidor
  enviarMensaje(){

    this._ChatService.sendMesage(this.texto)
    // console.log(this.texto);
  }


  getData(){

    this._HttpClient.get('http://localhost:4500/heroes').subscribe()

  }

  crearNuevo(){

    // console.log(this.texto);

    let heroe = {

      nombre: this.texto,
      poder: this.texto

    }

    // console.log(heroe);
    
    this._HttpClient.post('http://localhost:4500/', heroe).subscribe()

    // this._HttpClient.get('http://localhost:4500/heroes').subscribe()

  }

}
