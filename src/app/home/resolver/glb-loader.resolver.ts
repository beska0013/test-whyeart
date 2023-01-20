import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {NgtLoader} from "@angular-three/core";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class GlbLoaderResolver implements Resolve<boolean> {

  constructor(private loader: NgtLoader, @Inject(PLATFORM_ID) private platformId: any) {}
  resolve(): Observable<any> {

    return isPlatformBrowser(this.platformId) ?
      this.loader.use( GLTFLoader, './assets/images/brain_mesh.glb'):
      EMPTY
  }
}
