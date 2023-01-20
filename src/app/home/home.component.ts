import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef, Inject,
  OnInit, PLATFORM_ID, ViewChild,
} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {HomeRoutingRoutingModule} from "./home-routing/home-routing-routing.module";

import {HeroComponent} from "./components/hero/hero.component";
import {AboutComponent} from "./components/about/about.component";
import {CareersComponent} from "./components/careers/careers.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ThreeBrainBgComponent} from "./components-ui/three-brain-bg/three-brain-bg.component";
import {NgtCanvas} from "@angular-three/core";
import {GsapService} from "../utils/gsap/gsap.service";



@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        CommonModule,
        HomeRoutingRoutingModule,
        HeroComponent,
        AboutComponent,
        CareersComponent,
        ContactComponent,
        ThreeBrainBgComponent,
        NgtCanvas
    ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private cdr:ChangeDetectorRef,
    private gsapSrv: GsapService
  ) {}


  @ViewChild('about') aboutSec!: ElementRef ;
  @ViewChild('careers') careersSec!: ElementRef;
  @ViewChild('contact') contactSec!: ElementRef ;

  @ViewChild('aboutSecLine') aboutSecLineEl!: ElementRef ;
  @ViewChild('carerrsSecLine') carerrsSecLineEl!: ElementRef ;

  btnMob = false;

  scrollTo(event: Event, el: ElementRef){
    event?.preventDefault();
    el.nativeElement.scrollIntoView({behavior: 'smooth'})
    this.btnMob = false;
  }

  burgerBtnHandler = () => this.btnMob = !this.btnMob;
  aboutTxt = {
    about_text: 'Subconscious is an independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species. We are a small self-funded team focused on design, human infrastructure, and AI. We have several full-time staff and an incredible set of advisors.',
    about_title : 'About',
    executive_title: 'Executives',
    executive_text: 'Avi Yashchin',
    executive_sub_text: 'Previously: Founder of Clean Edison (acquired by NYSE:$GHC)and WAHA Technologies (acquired by NASDAQ:$CLSK). Researcher at Two Sigma, JPL, IBM Watson.',
    advisor_title: 'Advisors',
    advisor_I_txt: 'Dr. Howard Moskowitz',
    advisor_II_txt : 'Dr. Niels Markwat',
    advisor_III_txt : 'Bonnie Schwartz ',
    research_title : 'Research and Engineering',
    research_txt : 'John, Niels, Beso, Jakov, Sarah, Vasili, Matt, Will, Usama, Kevin',
    guides_title : 'Discord Moderators and Guides',
    guides_txt : 'Entropy, Vales, Eugene',
    finance_title : 'Legal and Finance',
    finance_txt : 'Joe Daniels, Anthony Laurentano',
  }
  careersTxt = {
    title_txt: 'Careers',
    I_txt: "We're a small, self-funded, fully-distributed team and we're actively hiring!",
    II_txt: "Come help us scale, explore, and build humanist infrastructure focused on amplifying the human mind and spirit.",
    III_txt: "If you're interested in working with us check out our",
    III_txt_link: "jobs page.",
    IV_txt: "If you're sure you can help, but don't see a position that fits",
    IV_txt_link: "email us.",
    V_txt: "We look forward to hearing from you.",
  }
  constactTxt = {
    title: 'Contact',
    cnt_txt_I_f_half:'For product support or questions please',
    cnt_txt_I_link:'join our Discord',
    cnt_txt_I_sec_half:'and ask questions in our #support chatrooms.',
    cnt_II_txt: 'For Journalist inquiries:',
    cnt_III_link: 'press@subconscious.ai',
    cnt_IV_txt: 'For Commercial inquiries:',
    cnt_V_link: 'ethicsboard@subconscious.ai',
  }


  ngAfterViewInit(): void {
    const args = {
      target: this.aboutSec.nativeElement,
      divideLine_I: this.aboutSecLineEl.nativeElement,
      divideLine_II: this.carerrsSecLineEl.nativeElement,
      about:{
        section: this.aboutSec.nativeElement.children[0].children[0].children,
        ...this.aboutTxt
      },
      careers:{
        section: this.careersSec.nativeElement.children[0].children[0].children,
        ...this.careersTxt
      },
      contact:{
        section: this.contactSec.nativeElement.children[0].children[0].children,
        ...this.constactTxt
      }

    }
    if(isPlatformBrowser(this.platformId)){
      this.gsapSrv.typeWrightAnimation(args)
    }



  }

}
