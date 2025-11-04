// Libraries
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

// Services
import { WebsocketService } from './services/websocket.service';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
  msg: string = '';

  private _websocketService: WebsocketService = inject(WebsocketService);
  private _adminService: AdminService = inject(AdminService);

  ngOnInit(): void {
    this._websocketService.initialize();
    this._adminService.initialize();
  }

  sendMsg(): void {
    console.log(this.msg);
    this._adminService.sendToast(this.msg);
    this.msg = '';
  }
}
