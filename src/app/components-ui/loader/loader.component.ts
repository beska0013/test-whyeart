import {AfterViewInit, Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {GsapService} from "../../utils/gsap/gsap.service";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterViewInit{
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private gsapSrv: GsapService,
  ) {}

  @Input() type: string | undefined

 @ViewChild('dots') dots: ElementRef | undefined;
 str = '...';

  ngAfterViewInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.gsapSrv.oneLineInfiniteTypeWriter(this.str, this.dots?.nativeElement);
    }
  }
}
