import {AfterViewInit, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {gsap} from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from 'gsap/ScrollSmoother';


gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-scrollbar-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scrollbar-ui.component.html',
  styleUrls: ['./scrollbar-ui.component.scss']
})
export class ScrollbarUiComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    gsap.to('.scroll-path', {
      height: '100%',
      ease: "none",
      scrollTrigger: {
        scroller: ".scroller",
        start: 'top -100',
        end: 'bottom 100',
        scrub: 0.3
      }
    });
  }

}
