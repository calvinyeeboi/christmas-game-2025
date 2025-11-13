// Libraries
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Services
import { WebsocketService } from './services/websocket.service';
import { AdminService } from './services/admin.service';
import { MainService } from './services/main.service';
import { PlayerService } from './services/player.service';
import { RoomService } from './services/room.service';
import { DataService } from './services/data.service';

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
  private _mainService: MainService = inject(MainService);
  private _playerService: PlayerService = inject(PlayerService);
  private _roomService: RoomService = inject(RoomService);

  ngOnInit(): void {
    this._websocketService.initialize();
  }
}
