// Libraries
import { NgForOf, NgIf } from "@angular/common";
import { Component, effect, inject, signal, WritableSignal } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";

// Services
import { PlayerService } from "../../services/player.service";
import { WebsocketService } from "../../services/websocket.service";
import { GameService } from "../../services/game.service";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { RoomService } from "../../services/room.service";
import { RoutingService } from "../../services/routing.service";

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
  roomService: RoomService = inject(RoomService);
  websocketService: WebsocketService = inject(WebsocketService);
  routingService: RoutingService = inject(RoutingService);

  playerId: number = 0;
  password: string = '';
  dirty: boolean = false;
  selectedRoom: number = 0;
  availableRooms: any = [];
  error: WritableSignal<boolean> = signal(false);

  constructor() {
    effect(() => {
      if (this.websocketService.wsEstablished() && this.gameService.status().started) {
        this.playerService.getPlayers();
      }
    });
    effect(() => {
      const currentPlayer = this.playerService.currentPlayer();
      if (!currentPlayer.id && this.dirty) {
        this.error.set(true);
      } else if (currentPlayer.isAdmin) {
        this.routingService.goToAdmin();
      } else if (currentPlayer.id) {
        this.roomService.getHouse();
      }
    });
    effect(() => {
      const rooms = this.roomService.roomsAsArray();
      this.availableRooms = rooms;
    });
  }

  login(): void {
    this.dirty = true;
    this.error.set(false);
    this.playerService.login(this.playerId, this.password);
    this.reset();
  }

  enterRoom(): void {
    if (this.selectedRoom) {
      this.routingService.goToRoom(this.selectedRoom);
    }
    this.selectedRoom = 0;
  }

  reset(): void {
    this.playerId = 0;
    this.password = '';
  }
}