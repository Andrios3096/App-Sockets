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

  
texto = ''


    heroe = {
      nombre: this.texto,
      poder: this.texto
    }
  
  suscripcion: Subscription;
  arrayHeroes:any=[]

  constructor(public _WebsocketService: WebsocketService,
    public _ChatService:ChatService,
    public _HttpClient:HttpClient
    ) { }

  ngOnInit(){

    this.getData();

    this.arrayHeroes = []

    let a = this._ChatService.getmessages().subscribe(msg => {

      console.log(msg);

      this.arrayHeroes = msg

    a.unsubscribe
    });
    
  }

  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }

  // enviar un heroe al servidor
  enviar(){
    this._ChatService.sendMesage(this.texto)
    // console.log(this.texto);
    
    this.texto = ''
  }


  getData(){

    this._HttpClient.get('http://localhost:4500/heroes').subscribe(data =>{

    console.log(data);

    })

  }

  crearNuevo(){
    
    this._HttpClient.post('http://localhost:4500/', this.heroe).subscribe()

    // this._HttpClient.get('http://localhost:4500/heroes').subscribe()

  }

}
