import { Component,   NgZone, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgtCanvas, NgtLoader, NgtRenderState} from "@angular-three/core";
import {NgtAmbientLight, NgtPointLight, NgtSpotLight} from "@angular-three/core/lights";
import {NgtMesh} from "@angular-three/core/meshes";
import {NgtPrimitive} from "@angular-three/core/primitive";
import {NgtSobaOrbitControls} from "@angular-three/soba/controls";

import {
  AnimationClip,
  AnimationMixer,
  Clock,
  Color,
  Mesh,

} from "three";
import {of, tap} from "rxjs";

import {NgtBoxGeometry, NgtSphereGeometry} from "@angular-three/core/geometries";
import {NgtMeshBasicMaterial, NgtMeshStandardMaterial} from "@angular-three/core/materials";

import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-three-brain-bg',
  standalone: true,
  imports: [
    CommonModule,
    NgtCanvas,
    NgtAmbientLight,
    NgtSpotLight,
    NgtPointLight,
    NgtMesh,
    NgtPrimitive,
    NgtSobaOrbitControls,
    NgtBoxGeometry,
    NgtMeshBasicMaterial,
    NgtSphereGeometry,
    NgtMeshStandardMaterial
  ],
  templateUrl: './three-brain-bg.component.html',
  styleUrls: ['./three-brain-bg.component.scss']
})
export class ThreeBrainBgComponent implements OnInit {

  constructor(private loader: NgtLoader, private zone: NgZone, private ativeRoute: ActivatedRoute) {}

  brainMinScale = .7;
  overlayMinScale = 1;
  overlayArgs = [6.5, 4, 5];
  overlayFinish = true;
  overlayColorWrite = true;

  scene_enablePan = false;
  scene_enableZoom = false;

  animationMixer!:AnimationMixer;
  clock  = new Clock();
  model$ = of(this.ativeRoute.snapshot.data['mesh'])
    .pipe(tap(res => this.onMeshLoad(res)));



  onBeforeBrainRender($event: { state: NgtRenderState; object: Mesh }){
    this.brainMeshAnimation($event.object)
  }

  onBeforeOverlayRender($event: { state: NgtRenderState; object: Mesh }){
   return $event.object.position.z >= -4 ?
             this.overlayAnimation($event.object) :
             this.overlayFinish = false;
  }

  onDrag(event:any){}
  onOverlayLoad(event:any){
    event.material.colorWrite = this.overlayColorWrite;
    event.material.color = new Color(0xffffff);
    event.material.toneMapped = false;
  }

  private onMobileSize(){
    const desk_width = 1200;
    const mob_width = 768;
    const min_width = 500;
    const win_width = window.innerWidth;

    if(win_width <= min_width){
      return this.brainMinScale -= ( ( (min_width - win_width)/ 1000) + .2);
    }
    if(mob_width >= win_width){
      return this.brainMinScale = .8
    }
    if(desk_width >= win_width){
      return this.brainMinScale = .5
    }
    return null
  }
  private overlayAnimation(object: Mesh){
    object.position.x -= 0.003;
    object.position.z -= 0.003;
    object.scale.y += 0.002;
    object.scale.x += 0.002;

    if(object.scale.y > 2 ){
      object.scale.y -= 0.002;
      object.scale.x -= 0.002;
    }

  }
  private brainMeshAnimation(object: Mesh){
    object.rotation.y += 0.001;
    !!this.animationMixer ? this.animationMixer.update(this.clock.getDelta()): null;
  }
  private onMeshLoad(loadedMesh:any){
    return this.zone.runOutsideAngular(() => {
      this.onMobileSize();
      this.animationMixer = new AnimationMixer(loadedMesh.scene);
      loadedMesh.animations.forEach((clip: AnimationClip) => this.animationMixer.clipAction(clip).play())
    })

 }

  ngOnInit(): void {}









}
