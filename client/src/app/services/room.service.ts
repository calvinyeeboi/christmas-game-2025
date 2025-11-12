// Libraries
import { effect, inject, Injectable, signal } from '@angular/core';

// Utils
import CONSTANTS from '../../../../server/constants';
import { ApiResponse } from '../models';

// Services
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class RoomService {
  baseUrl = CONSTANTS.API_ROUTES.ROOM.ROUTE;
  public rooms = signal({});
  public currentRoom = signal({});

  private _websocketService: WebsocketService = inject(WebsocketService);

  constructor() {
    effect(() => {
      const response: ApiResponse = this._websocketService.wsMsgReceived();
      if (response.route === this.baseUrl) {
        this.handleMsg(response.method, response.data);
      }
    });
  }
  
  getRooms(): void {
    this._websocketService.sendMessage({
      route: `${this.baseUrl}/${CONSTANTS.API_ROUTES.ROOM.GET_ROOMS}`,
    });
  }

  getRoom(id: string): void {
    this._websocketService.sendMessage({
      route: `${this.baseUrl}/${CONSTANTS.API_ROUTES.ROOM.GET_ROOM}/${id}`,
    });
  }

  handleMsg(method: string, data: any) {
    switch (method) {
      case CONSTANTS.API_ROUTES.ROOM.GET_ROOMS:
        if (data.rooms) {
          this.rooms.set(data.rooms);
        }
        break;
      case CONSTANTS.API_ROUTES.ROOM.GET_ROOM:
        if (data.room) {
          this.currentRoom.set(data.room);
        }
        break;
    }
  }
}