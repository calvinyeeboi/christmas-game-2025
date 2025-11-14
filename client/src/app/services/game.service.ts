// Libraries
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';

// Utils
import CONSTANTS from '../../../../server/constants';
import { ApiResponse, GameStatus } from '../models';

// Services
import { WebsocketService } from './websocket.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class GameService {
  baseUrl = CONSTANTS.API_ROUTES.GAME.ROUTE;
  public status: WritableSignal<GameStatus> = signal({ started: false });

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
  
  getStatus(): any {
    return this._dataService.get({ url: `${this.baseUrl}/${CONSTANTS.API_ROUTES.GAME.STATUS}` }).subscribe((response: any) => {
      if (response.status) {
        this.status.set(response.status);
      }
    });
  }

  handleWsMsg(method: string, data: any) {
    switch (method) {
      case CONSTANTS.API_ROUTES.GAME.START:
        this.status.update(currentStatus => ({
          ...currentStatus,
          started: true,
        }));
        break;
    }
  }
}