// Libraries
import { Component, inject, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

// Services
import { AdminService } from "../../services/admin.service";
import { MainService } from "../../services/main.service";

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
})
export class AdminComponent implements OnInit {
  msg: string = '';
  startGameMsg: string = 'Start Game';

  public mainService: MainService = inject(MainService);
  public adminService: AdminService = inject(AdminService);

  ngOnInit(): void {}

  sendMsg(): void {
    this.adminService.sendToast(this.msg);
    this.msg = '';
  }

  startGame(): void {
    this.adminService.startGame();
    this.startGameMsg = 'It has begin';
  }
}