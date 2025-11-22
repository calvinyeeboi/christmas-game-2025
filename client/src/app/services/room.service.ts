// Libraries
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';

// Utils
import CONSTANTS from '../../../../server/constants';
import { ApiResponse, House, level, Player, Room } from '../models';

// Services
import { WebsocketService } from './websocket.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class RoomService {
  baseUrl = CONSTANTS.API_ROUTES.ROOMS.ROUTE;
  public house: WritableSignal<House> = signal({});
  public currentRoom: WritableSignal<Room> = signal({});
  public roomsAsArray: WritableSignal<any> = signal([]);

  private _websocketService: WebsocketService = inject(WebsocketService);
  private _dataService: DataService = inject(DataService);

  constructor() {
    effect(() => {
      const response: ApiResponse = this._websocketService.wsMsgReceived();
      if (response.route === this.baseUrl) {
        this.handleWsMsg(response.method, response.data);
      }
    });
    effect(() => {
      let roomsArray: any = [];
      const house = this.house();
      for (const levelKey in house) {
        const level = house[levelKey];
        const group: any = {
          name: level.name,
          rooms: [],
        };
        for (const roomKey in level.rooms) {
          const room = level.rooms[roomKey];
          group.rooms.push(room);
        }
        roomsArray.push(group);
      }
      this.roomsAsArray.set(roomsArray);
    });
  }

  canActivateRoom(id: string, player: Player): boolean {
    if (player.id) {
      const room = this.findRoomById(id);
      if (room?.players && room?.limit && room.players.length <= room.limit) {
        return true;
      }
    }
    return false;
  }

  findRoomById(id: string): Room | null {
    const roomId = parseInt(id);
    let found: Room | null = null;
    if (roomId) {
      for (const levelKey in this.house()) {
        for (const roomKey in this.house()[levelKey].rooms) {
          const room = this.house()[levelKey].rooms[roomKey];
          if (room.id === roomId) {
            found = room;
          }
        }
      }
    }
    return found;
  }
  
  getHouse(): any {
    return this._dataService.get({ url: this.baseUrl }).subscribe((response: any) => {
      if (response.house) {
        this.house.set(response.house);
      }
    });
  }

  getRoom(id: number, playerId: number): any {
    return this._dataService.post({
      url: `${this.baseUrl}/${id}`,
      body: {
        playerId,
      }
    }).subscribe((response: any) => {
      if (response.room) {
        this.currentRoom.set(response.room);
      }
    });
  }

  handleWsMsg(method: string, data: any) {
    switch (method) {
      case CONSTANTS.API_ROUTES.ROOMS.GET_ROOMS:
        if (data.rooms) {
          // this.rooms.set(data.rooms);
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