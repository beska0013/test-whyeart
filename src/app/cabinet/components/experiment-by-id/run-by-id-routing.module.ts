import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExperimentByIdResolver} from "../../resolvers/experimentbyId/experiment-by-id.resolver";

const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./run-by-id.component').then(c => c.RunByIdComponent),
    resolve:{ run: ExperimentByIdResolver},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RunByIdRoutingModule { }
