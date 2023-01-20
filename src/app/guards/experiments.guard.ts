import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ExperimentsGuard implements CanActivate {
  constructor( @Inject(PLATFORM_ID) private platformId: any) {}
  windowState = false

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):any{
    if(isPlatformBrowser(this.platformId)){
     return window.addEventListener('load', () => {
        //this.windowState = true
        console.log(window);
        console.log('guard works')

      })

    }

    return this.windowState;
  }

}
