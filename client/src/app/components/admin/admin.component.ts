// Libraries
import { Component, inject, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

// Services
import { AdminService } from "../../services/admin.service";

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class AdminComponent implements OnInit {
  msg: string = '';
  private _adminService: AdminService = inject(AdminService);

  ngOnInit(): void {}

  sendMsg(): void {
    this._adminService.sendToast(this.msg);
    this.msg = '';
  }
}