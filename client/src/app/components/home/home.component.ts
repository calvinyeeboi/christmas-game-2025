// Libraries
import { NgForOf, NgIf } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";

// Services
import { PlayerService } from "../../services/player.service";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [NgIf, MatFormFieldModule, MatSelectModule, NgForOf],
})
export class HomeComponent implements OnInit {
  adminService: AdminService = inject(AdminService);
  playerService: PlayerService = inject(PlayerService)

  ngOnInit(): void {
    setTimeout(() => {
      this.playerService.getPlayers();
    }, 500);
  }
}