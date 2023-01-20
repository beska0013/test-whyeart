import {ElementRef, Injectable} from '@angular/core';
import {gsap} from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root'
})
export class GsapService {

  constructor() { }

  typeWrightAnimation(args:any){
    const divideLine ='==============================================================================================================================================';
    const winWidth = window.innerWidth;


    const tl = gsap.timeline({
      stagger: true,
      scrollTrigger: {
        trigger: args.target,
        scrub: winWidth > 500 ? 2 : 4,
        start: 'top 100%',
        end: winWidth > 500 ? '+=1800' : '+=1400',
      },
    })
    return tl.to(args.about.section[0].children[0],{
                text: args.about.about_title,
                ease: `step(${args.about.about_title.split('').length})`
             })
             .to(args.about.section[0].children[1],{
                        text: args.about.about_text,
                        ease: `step(${args.about.about_text.split('').length})`
             })
             .to(args.about.section[1].children[0],{
                       text: args.about.executive_title,
                       ease: `step(${args.about.executive_title.split('').length})`
             })
             .to(args.about.section[1].children[1],{
                        text: args.about.executive_text,
                        ease: `step(${args.about.executive_text.split('').length})`
             })
             .to(args.about.section[1].children[2],{
                  text: args.about.executive_sub_text,
                  ease: `step(${args.about.executive_sub_text.split('').length})`
             })
             .to(args.about.section[2].children[0],{
                  text: args.about.advisor_title,
                  ease: `step(${args.about.advisor_title.split('').length})`
             })
             .to(args.about.section[2].children[1],{
                    text: args.about.advisor_I_txt,
                    ease: `step(${args.about.advisor_I_txt.split('').length})`
             })
             .to(args.about.section[2].children[2],{
                text: args.about.advisor_II_txt,
                ease: `step(${args.about.advisor_II_txt.split('').length})`
             })
             .to(args.about.section[2].children[3],{
                text: args.about.advisor_III_txt,
                ease: `step(${args.about.advisor_III_txt.split('').length})`
             })
             .to(args.about.section[3].children[0],{
                      text: args.about.research_title,
                      ease: `step(${args.about.research_title.split('').length})`
             })
             .to(args.about.section[3].children[1],{
                      text: args.about.research_txt,
                      ease: `step(${args.about.research_txt.split('').length})`
             })
             .to(args.about.section[4].children[0],{
                        text: args.about.guides_title,
                        ease: `step(${args.about.guides_title.split('').length})`
              })
             .to(args.about.section[4].children[1],{
                text: args.about.guides_txt,
                ease: `step(${args.about.guides_txt.split('').length})`
              })
             .to(args.about.section[5].children[0],{
                text: args.about.finance_title,
                ease: `step(${args.about.finance_title.split('').length})`
              })
             .to(args.about.section[5].children[1],{
                text: args.about.finance_txt,
                ease: `step(${args.about.finance_txt.split('').length})`
              })
             .to(args.divideLine_I,{
                text: divideLine,
                ease: `step(${divideLine.split('').length})`
             })
             .to(args.careers.section[0].children[0], {
               text: args.careers.title_txt,
               ease: `step(${args.careers.title_txt.split('').length})`
             })
             .to(args.careers.section[0].children[1], {
               text: args.careers.I_txt,
               ease: `step(${args.careers.I_txt.split('').length})`
             })
             .to(args.careers.section[0].children[2], {
                  text: args.careers.II_txt,
                  ease: `step(${args.careers.II_txt.split('').length})`
             })
             .to(args.careers.section[0].children[3].children[0], {
                  text: args.careers.III_txt,
                  ease: `step(${args.careers.III_txt.split('').length})`
             })
             .to(args.careers.section[0].children[3].children[1],{
                text: args.careers.III_txt_link,
                ease: `step(${args.careers.III_txt_link.split('').length})`
              })
             .to(args.careers.section[0].children[4].children[0], {
                  text: args.careers.IV_txt,
                  ease: `step(${args.careers.IV_txt.split('').length})`
             })
             .to(args.careers.section[0].children[4].children[1], {
                  text: args.careers.IV_txt_link,
                  ease: `step(${args.careers.IV_txt_link.split('').length})`
              })
             .to(args.careers.section[0].children[5], {
                  text: args.careers.V_txt,
                  ease: `step(${args.careers.V_txt.split('').length})`
             })
             .to(args.divideLine_II,{
                text: divideLine,
                ease: `step(${divideLine.split('').length})`
              })
             .to(args.contact.section[0].children[0], {
               text: args.contact.title,
               ease: `step(${args.contact.title.split('').length})`
             })
             .to(args.contact.section[0].children[1].children[0], {
               text: args.contact.cnt_txt_I_f_half,
               ease: `step(${args.contact.cnt_txt_I_f_half.split('').length})`
             })
             .to(args.contact.section[0].children[1].children[1], {
               text: args.contact.cnt_txt_I_link,
               ease: `step(${args.contact.cnt_txt_I_link.split('').length})`
             })
             .to(args.contact.section[0].children[1].children[2], {
               text: args.contact.cnt_txt_I_sec_half,
               ease: `step(${args.contact.cnt_txt_I_sec_half.split('').length})`
             })
             .to(args.contact.section[0].children[2], {
               text: args.contact.cnt_II_txt,
               ease: `step(${args.contact.cnt_II_txt.split('').length})`
             })
             .to(args.contact.section[0].children[3].children[0], {
               text: args.contact.cnt_III_link,
               ease: `step(${args.contact.cnt_III_link.split('').length})`
             })
             .to(args.contact.section[0].children[4], {
               text: args.contact.cnt_IV_txt,
               ease: `step(${args.contact.cnt_IV_txt.split('').length})`
             })
             .to(args.contact.section[0].children[5].children[0], {
               text: args.contact.cnt_V_link,
               ease: `step(${args.contact.cnt_V_link.split('').length})`
             })
  }

  customScroller = false;


  onListScroll(scroller:ElementRef, slider:ElementRef){
   const tl = gsap.timeline( {
      scrollTrigger: {
        scroller: scroller.nativeElement,
        scrub:.3,
        onUpdate: (event) => {
          console.log(this.customScroller);
          console.log(event.progress);
          return this.customScroller ? null : slider.nativeElement.value = `${event.progress * 100}`;
        }
     }
    })

    return tl.scrollTrigger
  }

 oneLineInfiniteTypeWriter (str:string, element: gsap.TweenTarget){
   gsap.to(element,{
      text: str,
      repeat: -1,
      ease: `step(${str.split('').length})`,
      duration: 1,
    })
 }


  cursorAnimation(cursorEl:any){
    gsap.timeline().to(cursorEl,{
      opacity: 0,
      ease:'power4.inOut',
      repeat: -1
    })
  }
}
