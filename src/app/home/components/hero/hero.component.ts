import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, Inject,
  OnInit, PLATFORM_ID,
  Renderer2,
  ViewChild
} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {ThreeBrainBgComponent} from "../../components-ui/three-brain-bg/three-brain-bg.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import * as EmailValidator from 'email-validator';
import {FirebaseService} from "../../../utils/firebase/firebase.service";
import {NotificationComponent} from "../../components-ui/notification/notification.component";
import {Subject} from "rxjs";
import {GsapService} from "../../../utils/gsap/gsap.service";

import {CrudService} from "../../../utils/crud/crud.service";
import {DomSanitizer} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";





@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    ThreeBrainBgComponent,
    ReactiveFormsModule,
    NotificationComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  providers:[ FirebaseService ]
})
export class HeroComponent implements OnInit,AfterViewInit {



  constructor(
    private renderer: Renderer2,
    private fibaseSrv: FirebaseService,
    private gsapSrv: GsapService,
    private sanitizer:DomSanitizer,
    private cdr:ChangeDetectorRef,
    private crudSrv: CrudService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  @ViewChild('ripple') rippleEl: ElementRef<HTMLElement> | undefined;
  @ViewChild('heroText') heroText: ElementRef<HTMLElement> | undefined;
  @ViewChild('cursor') cursor: ElementRef<HTMLElement> | undefined;
  @ViewChild('heroFm') heroFmEl: ElementRef<HTMLElement> | undefined;


  text = 'Artificial Intelligence has a strong grasp on probability, yet still can’t compute cause and effect. Until now.'

  btnState = true;
  experimentForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ])
  })
  notify$ = new Subject<any>();

  url = this.sanitizer.bypassSecurityTrustResourceUrl(environment.launch_list);


  ngOnInit(): void {
    this.onErrorEmail('error');
    this.notify$.subscribe(res => {
      // console.log(res);
    })

   this.experimentForm.valueChanges.subscribe(() => {
     this.notify$.next(undefined)
     this.btnState = !this.experimentForm.valid
   })
  }

  ngAfterViewInit(): void {
    if(isPlatformBrowser(this.platformId)){

      const script = document.createElement('script');
      const head = document.querySelector('head');
      script.src = 'https://getlaunchlist.com/js/widget.js';
      script.setAttribute('defer', '');
      head?.append(script);

    }
  }

  onSubmit(event:any){
    event.preventDefault()
    const fm_value = this.experimentForm.value.email as unknown as string;
    return EmailValidator.validate(fm_value) ?
      this.fibaseSrv.onValidEmail(fm_value)
        .then(res => !!res.key ?
                      this.onSuccessSighnIn() :
                      this.onInvalidSighnIn(res)
      ): this.onErrorEmail('unknownError');
  }

  onClickAnimate(event: any){
    if(this.rippleEl?.nativeElement.classList.contains('ripple_animate')){
      this.rippleEl?.nativeElement.classList.remove('ripple_animate')
    }
    const btn = event.currentTarget as HTMLButtonElement;
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    this.renderer.setStyle(this.rippleEl?.nativeElement,'width', `${diameter}px`);
    this.renderer.setStyle(this.rippleEl?.nativeElement,'height', `${diameter}px`);
    this.renderer.setStyle(this.rippleEl?.nativeElement,'left', `${event.clientX  - (btn.offsetLeft + radius )}px`);
    this.renderer.setStyle(this.rippleEl?.nativeElement,'top', `${event.clientY - (btn.offsetTop + radius )}px`);


    this.rippleEl?.nativeElement.classList.add('ripple_animate');

  }

  onErrorEmail = (msg:string) => this.notify$.next(msg);

  onSuccessSighnIn() {
   (this.heroFmEl?.nativeElement as HTMLFormElement).submit();
   this.notify$.next('success');

   //TODO for custom http call.Requires plan upgrade
   // this.crudSrv.httpPost(`${this.url}/?email=gugushvili.beso001334dfgsdfddfg@gmail.com`, {email: 'gugushvili.beso001334dfgsdfddfg@gmail.com'})
   //    .subscribe(res => console.log(res))

   //TODO disable notification
  //setTimeout(()=>  this.notify$.next(undefined), 2500)
    this.experimentForm.reset();
  }

  onInvalidSighnIn(err:any) {
    return this.onErrorEmail('unknown')
  }







}
