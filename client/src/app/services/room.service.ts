// Libraries
import { effect, inject, Injectable, signal } from '@angular/core';

// Utils
import CONSTANTS from '../../../../server/constants';
import { ApiResponse } from '../models';

// Services
import { WebsocketService } from './websocket.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class RoomService {
  baseUrl = CONSTANTS.API_ROUTES.ROOM.ROUTE;
  public rooms = signal({});
  public currentRoom = signal({});

  private _websocketService: WebsocketService = inject(WebsocketService);
  private _dataService: DataService = inject(DataService);

  constructor() {
    effect(() => {
      const response: ApiResponse = this._websocketService.wsMsgReceived();
      if (response.route === this.baseUrl) {
        this.handleMsg(response.method, response.data);
      }
    });
  }
  
  getRooms(): any {
    return this._dataService.get({ url: this.baseUrl }).subscribe((response: any) => {
      if (response.rooms) {
        this.rooms.set(response.rooms);
      }
    });
  }

  getRoom(id: string): any {
    return this._dataService.get({ url: `${this.baseUrl}/${id}` }).subscribe((response: any) => {
      if (response.room) {
        this.currentRoom.set(response.room);
      }
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