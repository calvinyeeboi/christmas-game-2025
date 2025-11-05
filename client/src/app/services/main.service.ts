// Libraries
import { Injectable } from '@angular/core';
import { Player } from '../models';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class MainService {
  public gameStarted: boolean = true;

  canActivateDoor(key: string): boolean {
    return this.gameStarted;
  }
}