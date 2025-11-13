// Libraries
import { Injectable, signal, WritableSignal } from '@angular/core';
import { ApiResponse } from '../models';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class WebsocketService {
  ws: any = undefined;
  public wsMsgReceived: WritableSignal<ApiResponse> = signal({ route: '', method: '', data: {} });
  public wsEstablished: WritableSignal<boolean> = signal(false);

  initialize(): void {
    this.ws = new WebSocket('ws://192.168.1.99:8081');
    this.initWs();
  }

  initWs(): void {
    this.ws.onopen = () => {
      console.log('Connected to server');
      this.wsEstablished.set(true);
    };
  
    this.ws.onmessage = (event: any) => {
      this.handleMessage(event.data);
    };
  
    this.ws.onclose = () => {
      console.log('Disconnected from server');
    };
  }

  handleMessage(data: any): void {
    try {
      const apiMsg = JSON.parse(data);
      const apiParts = apiMsg.route.split('/');
      const route = apiParts[0];
      const method = apiParts[1];
      const response: ApiResponse = {
        route,
        method,
        data: apiMsg.data,
      };
      console.log('handleMessage');
      console.log(response);
      this.wsMsgReceived.set(response);
    } catch (error: any) {
      console.error(error);
    }
  }

  sendMessage({ route = '', data = {} }): void {
    this.ws.send(JSON.stringify({ route, data }));
  }
}