// Libraries
import { NgForOf, NgIf } from "@angular/common";
import { Component, effect, inject } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";

// Services
import { PlayerService } from "../../services/player.service";
import { AdminService } from "../../services/admin.service";
import { WebsocketService } from "../../services/websocket.service";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [NgIf, MatFormFieldModule, MatSelectModule, NgForOf],
})
export class HomeComponent {
  adminService: AdminService = inject(AdminService);
  playerService: PlayerService = inject(PlayerService);
  websocketService: WebsocketService = inject(WebsocketService);

  constructor() {
    effect(() => {
      if (this.websocketService.wsEstablished()) {
        this.playerService.getPlayers();
      }
    })
  }
}