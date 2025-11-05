// Libraries
import { DestroyRef, inject, Injectable } from '@angular/core';

// Utils
import CONSTANTS from '../constants';

// Services
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class MainService {
  public gameStarted: boolean = true;
  baseUrl = CONSTANTS.API_ROUTES.ADMIN.ROUTE;
  
  private _websocketService: WebsocketService = inject(WebsocketService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  canActivateDoor(key: string): boolean {
    return this.gameStarted;
  }
}