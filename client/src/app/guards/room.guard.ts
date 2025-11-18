import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RoomService } from '../services/room.service';
import { PlayerService } from '../services/player.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateRoom implements CanActivate {
  private _roomService: RoomService = inject(RoomService);
  private _playerService: PlayerService = inject(PlayerService);
  private _router: Router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    const willActivate: boolean = this._roomService.canActivateRoom(route.params['id'], this._playerService.currentPlayer());
    if (willActivate) {
      return willActivate;
    }
    return this._router.createUrlTree(['/']);
  }
}