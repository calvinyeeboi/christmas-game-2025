// Libraries
import { DestroyRef, inject, Injectable } from '@angular/core';

// Utils
import CONSTANTS from '../../../../server/constants';
import { ApiResponse, Player } from '../models';

// Services
import { WebsocketService } from './websocket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class PlayerService {
  baseUrl = CONSTANTS.API_ROUTES.PLAYER.ROUTE;
  public players: Player[] = [];

  private _websocketService: WebsocketService = inject(WebsocketService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  initialize(): void {
    this._websocketService.wsMsgReceived$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((response: ApiResponse) => {
        console.log(response.route);
        if (response.route === this.baseUrl) {
          this.handleMsg(response.method, response.data);
        }
      });
  }
  
  getPlayers(): void {
    this._websocketService.sendMessage({
      route: `${this.baseUrl}/${CONSTANTS.API_ROUTES.PLAYER.GET_PLAYERS}`,
    });
  }

  handleMsg(method: string, data: any) {
    console.log('handleMessage');
    switch (method) {
      case CONSTANTS.API_ROUTES.PLAYER.GET_PLAYERS:
        console.log(data);
        if (data.players?.length) {
          this.players = data.players;
        }
        break;
    }
  }
}