// Libraries
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';

// Utils
import CONSTANTS from '../../../../server/constants';
import { ApiResponse, Room, Rooms } from '../models';

// Services
import { WebsocketService } from './websocket.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class RoomService {
  baseUrl = CONSTANTS.API_ROUTES.ROOMS.ROUTE;
  public rooms: WritableSignal<any> = signal({});
  public currentRoom: WritableSignal<Room> = signal({});

  private _websocketService: WebsocketService = inject(WebsocketService);
  private _dataService: DataService = inject(DataService);

  constructor() {
    effect(() => {
      const response: ApiResponse = this._websocketService.wsMsgReceived();
      if (response.route === this.baseUrl) {
        this.handleWsMsg(response.method, response.data);
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

  handleWsMsg(method: string, data: any) {
    switch (method) {
      case CONSTANTS.API_ROUTES.ROOMS.GET_ROOMS:
        if (data.rooms) {
          this.rooms.set(data.rooms);
        }
        break;
      case CONSTANTS.API_ROUTES.ROOMS.GET_ROOM:
        if (data.room) {
          this.currentRoom.set(data.room);
        }
        break;
    }
  }
}