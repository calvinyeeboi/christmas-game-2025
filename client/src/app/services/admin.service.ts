// Libraries
import { DestroyRef, inject, Injectable } from '@angular/core';

// Utils
import CONSTANTS from '../constants';
import { ApiResponse } from '../models';

// Services
import { WebsocketService } from './websocket.service';
import { SnackbarService } from './snackbar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class AdminService {
  baseUrl = CONSTANTS.API_ROUTES.ADMIN.ROUTE;
  private _websocketService: WebsocketService = inject(WebsocketService);
  private _snackbarService: SnackbarService = inject(SnackbarService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  initialize(): void {
    this._websocketService.wsMsgReceived$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((response: ApiResponse) => {
        if (response.route === this.baseUrl) {
          this.handleMsg(response.method, response.data);
        }
      });
  }
  
  sendToast(msg: string): void {
    this._websocketService.sendMessage({
      route: `${this.baseUrl}/${CONSTANTS.API_ROUTES.ADMIN.TOAST}`,
      data: {
        msg,
      }
    });
  }

  handleMsg(method: string, data: any) {
    switch (method) {
      case CONSTANTS.API_ROUTES.ADMIN.TOAST:
        this._snackbarService.openSnackbar(data.msg);
        break;
    }
  }
}