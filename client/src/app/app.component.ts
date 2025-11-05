// Libraries
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Services
import { WebsocketService } from './services/websocket.service';
import { AdminService } from './services/admin.service';
import { MainService } from './services/main.service';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';

  private _websocketService: WebsocketService = inject(WebsocketService);
  private _adminService: AdminService = inject(AdminService);
  private _mainService: MainService = inject(MainService);
  private _playerService: PlayerService = inject(PlayerService);

  ngOnInit(): void {
    this._websocketService.initialize();
    this._adminService.initialize();
    this._playerService.initialize();
  }
}
