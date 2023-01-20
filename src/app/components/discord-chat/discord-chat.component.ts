import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import Crate from "@widgetbot/crate";
import Options from "@widgetbot/crate/dist/types/options";



@Component({
  selector: 'app-discord-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discord-chat.component.html',
  styleUrls: ['./discord-chat.component.scss']
})
export class DiscordChatComponent implements OnInit{

  constructor() {}

  options: Options = {
    server: '1052986919916683274',
    channel: '1052986920906522636',
    defer: true,
    color: '#5AC0E5',
    notifications: false,// require for bug fix
    indicator: false,
    timeout:1000

  }

  crate:Crate | undefined;

  ngOnInit(): void {
    this.crate = new Crate(this.options);
  }
}


