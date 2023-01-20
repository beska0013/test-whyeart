import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MeilisearchResolver} from "./cabinet/resolvers/meilisearch.resolver";
import {ExperimentsGuard} from "./guards/experiments.guard";

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./home/home-routing/home-routing-routing.module').then(m => m.HomeRoutingRoutingModule)
  },
  {
    path: 'experiments',
    loadChildren: () => import('./cabinet/cabinet-routing.module').then(m => m.CabinetRoutingModule),
    // resolve:{response: MeilisearchResolver},
  },
  {
    path: ':id/experiments',
    loadChildren: () => import('./cabinet/cabinet-routing.module').then(m => m.CabinetRoutingModule),
    // resolve:{response: MeilisearchResolver},
  },
  // {
  //   path: '**',
  //   loadComponent: () => import('./unknown-url/unknown-url.component').then(c => c.UnknownURLComponent)
  // }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
