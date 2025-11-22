// Libraries
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Services
import { WebsocketService } from './services/websocket.service';
import { AdminService } from './services/admin.service';
import { PlayerService } from './services/player.service';
import { RoomService } from './services/room.service';
import { DataService } from './services/data.service';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';

  private _dataService: DataService = inject(DataService);
  private _websocketService: WebsocketService = inject(WebsocketService);
  private _adminService: AdminService = inject(AdminService);
  private _playerService: PlayerService = inject(PlayerService);
  private _roomService: RoomService = inject(RoomService);
  private _gameService: GameService = inject(GameService);

  constructor() {
    effect(() => {
      if (this._websocketService.wsEstablished()) {
        this._gameService.getStatus();
      }
    });
  }

  ngOnInit(): void {
    this._websocketService.initialize();
  }
}
