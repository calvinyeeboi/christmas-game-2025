// Libraries
import { Component, effect, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

// Services
import { AdminService } from "../../services/admin.service";
import { RoomService } from "../../services/room.service";
import { WebsocketService } from "../../services/websocket.service";
import { KeyValuePipe, NgTemplateOutlet } from "@angular/common";
import { GameService } from "../../services/game.service";
import { MatTabsModule } from "@angular/material/tabs";

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    KeyValuePipe,
    MatTabsModule,
    NgTemplateOutlet
],
})
export class AdminComponent {
  adminService: AdminService = inject(AdminService);
  roomService: RoomService = inject(RoomService);
  gameService: GameService = inject(GameService);
  websocketService: WebsocketService = inject(WebsocketService);

  msg: string = '';

  constructor() {
    effect(() => {
      if (this.websocketService.wsEstablished()) {
        this.roomService.getHouse();
      }
    });
  }

  sendMsg(): void {
    this.adminService.sendToast(this.msg);
    this.msg = '';
  }

  startGame(): void {
    this.adminService.startGame();
  }
}