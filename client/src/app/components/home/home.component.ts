// Libraries
import { NgForOf, NgIf } from "@angular/common";
import { Component, effect, inject } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";

// Services
import { PlayerService } from "../../services/player.service";
import { WebsocketService } from "../../services/websocket.service";
import { GameService } from "../../services/game.service";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [NgIf, MatFormFieldModule, MatSelectModule, NgForOf],
})
export class HomeComponent {
  gameService: GameService = inject(GameService);
  playerService: PlayerService = inject(PlayerService);
  websocketService: WebsocketService = inject(WebsocketService);

  constructor() {
    effect(() => {
      if (this.websocketService.wsEstablished() && this.gameService.status().started) {
        this.playerService.getPlayers();
      }
    })
  }
}