// Libraries
import { effect, inject, Injectable } from '@angular/core';

// Utils
import CONSTANTS from '../../../../server/constants';
import { ApiResponse, Player } from '../models';

// Services
import { WebsocketService } from './websocket.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class PlayerService {
  baseUrl = CONSTANTS.API_ROUTES.PLAYERS.ROUTE;
  public players: Player[] = [];

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
  
  getPlayers(): void {
    this._websocketService.sendMessage({
      route: `${this.baseUrl}/${CONSTANTS.API_ROUTES.PLAYERS.GET_PLAYERS}`,
    });
  }

  handleMsg(method: string, data: any) {
    switch (method) {
      case CONSTANTS.API_ROUTES.PLAYERS.GET_PLAYERS:
        if (data.players?.length) {
          this.players = data.players;
        }
        break;
    }
  }
}