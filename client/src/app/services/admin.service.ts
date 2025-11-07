// Libraries
import { effect, inject, Injectable } from '@angular/core';

// Utils
import CONSTANTS from '../../../../server/constants';
import { ApiResponse } from '../models';

// Services
import { WebsocketService } from './websocket.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class AdminService {
  baseUrl = CONSTANTS.API_ROUTES.ADMIN.ROUTE;
  gameStarted: boolean = false;

  private _websocketService: WebsocketService = inject(WebsocketService);
  private _snackbarService: SnackbarService = inject(SnackbarService);

  constructor() {
    effect(() => {
      const response: ApiResponse = this._websocketService.wsMsgReceived();
      if (response.route === this.baseUrl) {
        this.handleMsg(response.method, response.data);
      }
    });
  }

  handleMsg(method: string, data: any) {
    switch (method) {
      case CONSTANTS.API_ROUTES.ADMIN.TOAST:
        this._snackbarService.openSnackbar(data.msg);
        break;
      case CONSTANTS.API_ROUTES.ADMIN.START_GAME:
        this.gameStarted = true;
        break;
    }
  }
  
  sendToast(msg: string): void {
    this._websocketService.sendMessage({
      route: `${this.baseUrl}/${CONSTANTS.API_ROUTES.ADMIN.TOAST}`,
      data: {
        msg,
      }
    });
  }

  startGame(): void {
    this._websocketService.sendMessage({
      route: `${this.baseUrl}/${CONSTANTS.API_ROUTES.ADMIN.START_GAME}`,
      data: {},
    });
  }
}