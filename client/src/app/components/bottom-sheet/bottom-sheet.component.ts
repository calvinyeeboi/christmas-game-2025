// Libraries
import { Component, inject } from "@angular/core";

// Services
import { RoomService } from "../../services/room.service";
import { MatListModule } from "@angular/material/list";

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  imports: [
    MatListModule,
  ],
})
export class BottomSheetComponent {
  roomService: RoomService = inject(RoomService);

  btnClick(event: any): void {
    console.log(event);
  }
}