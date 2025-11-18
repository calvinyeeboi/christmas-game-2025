// Libraries
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';

// Utils
import CONSTANTS from '../../../../server/constants';
import { ApiResponse, level, Player, Room, Rooms } from '../models';

// Services
import { WebsocketService } from './websocket.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class RoomService {
  baseUrl = CONSTANTS.API_ROUTES.ROOMS.ROUTE;
  public rooms: WritableSignal<Rooms | any> = signal({});
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
      const floors = this.rooms();
      for (const floorKey in floors) {
        const floor = floors[floorKey];
        const group: any = {
          name: CONSTANTS.FLOORS[floorKey as level].NAME,
          rooms: [],
        };
        for (const roomKey in floor) {
          const room = floor[roomKey];
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
      for (const floorKey in this.rooms()) {
        for (const roomKey in this.rooms()[floorKey]) {
          const room = this.rooms()[floorKey][roomKey];
          if (room.id === roomId) {
            found = room;
          }
        }
      }
    }
    return found;
  }
  
  getRooms(): any {
    return this._dataService.get({ url: this.baseUrl }).subscribe((response: any) => {
      if (response.rooms) {
        this.rooms.set(response.rooms);
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