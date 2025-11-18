// Libraries
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';

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
  public players: WritableSignal<Player[]> = signal([]);
  public currentPlayer: WritableSignal<Player> = signal({ id: 0, name: '', inventory: {} });

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
  
  getPlayers(): any {
    return this._dataService.get({ url: this.baseUrl }).subscribe((response: any) => {
      if (response.players) {
        this.players.set(response.players);
      }
    });
  }

  login(id: number, password: string): any {
    return this._dataService.post({
      url: `${this.baseUrl}/${CONSTANTS.API_ROUTES.PLAYERS.LOGIN}`,
      body: {
        id,
        password,
      },
    }).subscribe((response: any) => {
      if (response.player) {
        this.currentPlayer.set(response.player);
      } else {
        this.currentPlayer.update(() => ({
          ...this.currentPlayer(),
        }));
      }
    });
  }

  handleMsg(method: string, data: any) {
    switch (method) {
      case CONSTANTS.API_ROUTES.PLAYERS.GET_PLAYERS:
        if (data.players?.length) {
          this.players.set(data.players);
        }
        break;
    }
  }
}