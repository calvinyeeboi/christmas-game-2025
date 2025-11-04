import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
  msg: string = '';
  ws = new WebSocket('ws://192.168.1.99:8081');
  // ws = new WebSocket('ws://localhost:8081');
  allMsgs: any = [];

  ngOnInit(): void {
    this.initWs();
  }

  initWs(): void {
    this.ws.onopen = () => {
      console.log('Connected to server');
    };
  
    this.ws.onmessage = (event) => {
      console.log(event);
      this.allMsgs.push(event.data);
    };
  
    this.ws.onclose = () => {
      console.log('Disconnected from server');
    };
  }

  sendMsg(): void {
    console.log(this.msg);
    this.ws.send(this.msg);
  }
}
