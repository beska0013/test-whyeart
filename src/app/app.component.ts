import { Component } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError, ResolveEnd,
  ResolveStart,
  Router
} from "@angular/router";
import {delay, map, of, tap} from "rxjs";


@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-loader *ngIf="loading$ | async" [type]="'loading'"></app-loader>
  `,
})
export class AppComponent{
  title = 'why.earth.UI';

  constructor(private router: Router) {}

  loading$ = this.router.events.pipe(
              map(event => this.enableLoading(event))
            )



  private enableLoading(event:Event):boolean{
    if( event instanceof ResolveStart ) return true
    if( event instanceof ResolveEnd || event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError)  return false
    return false
  }
}


