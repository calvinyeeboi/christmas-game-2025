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
import { ActivatedRoute } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { BottomSheetComponent } from "../bottom-sheet/bottom-sheet.component";
import { PlayerService } from "../../services/player.service";
import { RoutingService } from "../../services/routing.service";

@Component({
  selector: 'app-room',
  standalone: true,
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class RoomComponent {
  private _route = inject(ActivatedRoute);
  private _bottomSheet = inject(MatBottomSheet);

  adminService: AdminService = inject(AdminService);
  roomService: RoomService = inject(RoomService);
  websocketService: WebsocketService = inject(WebsocketService);
  playerService: PlayerService = inject(PlayerService);
  routingService: RoutingService = inject(RoutingService);

  msg: string = '';
  currentRoom: any = {};
  roomId: number = 0;

  constructor() {
    effect(() => {
      if (this.websocketService.wsEstablished()) {
        this.roomId = this._route.snapshot.params['id'] as number;
        this.roomService.getRoom(this.roomId, this.playerService.currentPlayer().id);
      }
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }
}