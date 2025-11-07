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
import { KeyValuePipe } from "@angular/common";

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
    KeyValuePipe
  ],
})
export class AdminComponent {
  public mainService: MainService = inject(MainService);
  public adminService: AdminService = inject(AdminService);
  public roomService: RoomService = inject(RoomService);
  public websocketService: WebsocketService = inject(WebsocketService);

  msg: string = '';

  constructor() {
    effect(() => {
      if (this.websocketService.wsEstablished()) {
        this.roomService.getRooms();
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