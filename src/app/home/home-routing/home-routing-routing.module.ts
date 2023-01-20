import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GlbLoaderResolver} from "../resolver/glb-loader.resolver";


const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('../home.component').then(c => c.HomeComponent),
    resolve:{ mesh: GlbLoaderResolver }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingRoutingModule { }
