// Libraries
import { NgForOf, NgIf } from "@angular/common";
import { Component, effect, inject } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";

// Services
import { PlayerService } from "../../services/player.service";
import { WebsocketService } from "../../services/websocket.service";
import { GameService } from "../../services/game.service";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatFormFieldModule, MatSelectModule, NgForOf, MatInputModule, FormsModule, MatButtonModule],
})
export class HomeComponent {
  gameService: GameService = inject(GameService);
  playerService: PlayerService = inject(PlayerService);
  websocketService: WebsocketService = inject(WebsocketService);

  playerId: number = 0;
  password: string = '';

  constructor() {
    effect(() => {
      if (this.websocketService.wsEstablished() && this.gameService.status().started) {
        this.playerService.getPlayers();
      }
    })
  }

  login(): void {
    console.log(this.playerId);
    console.log(this.password);
    this.playerService.login(this.playerId, this.password);
  }
}