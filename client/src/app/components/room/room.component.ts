// Libraries
import { Component, effect, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

// Services
import { AdminService } from "../../services/admin.service";
import { MainService } from "../../services/main.service";
import { RoomService } from "../../services/room.service";
import { WebsocketService } from "../../services/websocket.service";
import { ActivatedRoute } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { BottomSheetComponent } from "../bottom-sheet/bottom-sheet.component";

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

  public mainService: MainService = inject(MainService);
  public adminService: AdminService = inject(AdminService);
  public roomService: RoomService = inject(RoomService);
  public websocketService: WebsocketService = inject(WebsocketService);

  msg: string = '';
  currentRoom: any = {};

  constructor() {
    effect(() => {
      if (this.websocketService.wsEstablished()) {
        const roomId = this._route.snapshot.params['id'];
        this.roomService.getRoom(roomId);
      }
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }
}