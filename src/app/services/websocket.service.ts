import { Injectable } from '@angular/core';
//2
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(private socket: Socket) { 
    this.checkStatus()
  }

  checkStatus() {

    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;

    })

    this.socket.on('disconnect', () => {
      console.log('desconectado al servidor');
      this.socketStatus = false;

    })

  }

//enviar

  emit(evento:string, payload?:any, callback?:Function){

    console.log('emitiendo', evento);
    
    this.socket.emit(evento,payload,callback)
  }

// escuchar

  listen( evento:string ){
    return this.socket.fromEvent( evento )
  }



}
