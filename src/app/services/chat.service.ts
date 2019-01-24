import { Injectable } from "@angular/core";
import { WebsocketService } from "./websocket.service";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  constructor(public _WebsocketService: WebsocketService) {}

  sendMesage(mensaje: string) {
    
    const payload = {
      de: "Leandro",
      cuerpo: mensaje
    };

    this._WebsocketService.emit('mensaje', payload)
    // console.log('mensaje enviado')
  }

//obtener heroes
  getmessages(){
    return this._WebsocketService.listen('heroes')
  }

}
