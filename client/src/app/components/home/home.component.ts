import { NgForOf, NgIf } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";

// Services
import { PlayerService } from "../../services/player.service";
import { MainService } from "../../services/main.service";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [NgIf, MatFormFieldModule, MatSelectModule, NgForOf],
})
export class HomeComponent implements OnInit {
  mainService: MainService = inject(MainService);
  playerService: PlayerService = inject(PlayerService)

  ngOnInit(): void {
    setTimeout(() => {
      this.playerService.getPlayers();
    }, 500);
  }
}