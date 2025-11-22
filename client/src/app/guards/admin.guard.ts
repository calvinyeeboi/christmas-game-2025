import { inject, Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { PlayerService } from '../services/player.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateAdmin implements CanActivate {
  private _playerService: PlayerService = inject(PlayerService);
  private _router: Router = inject(Router);

  canActivate(): MaybeAsync<GuardResult> {
    const willActivate: boolean = !!this._playerService.currentPlayer().isAdmin;
    if (willActivate) {
      return willActivate;
    }
    return this._router.createUrlTree(['/']);
  }
}