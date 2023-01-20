import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-cabinet',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLink, RouterLinkActive],
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  constructor() { }


  logo = environment.logo_link;

  ngOnInit(): void {}

}
