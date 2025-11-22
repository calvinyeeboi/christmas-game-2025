// Libraries
import { inject, Injectable } from '@angular/core';

// Utils
import CONSTANTS from '../../../../server/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class RoutingService {
  private _router: Router = inject(Router);
  
  goToRoom(roomId: number): void {
    if (roomId) {
      this._router.navigateByUrl(`/room/${roomId}`);
    }
  }

  goToMain(): void {
    this._router.navigateByUrl('');
  }

  goToAdmin(): void {
    this._router.navigateByUrl('/admin');
  }
}