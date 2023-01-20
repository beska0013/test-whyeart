import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllExperimentResolver} from "./resolvers/all-experiments/all-experiment.resolver";
import {ShinyAppResolver} from "./resolvers/shinyApp/shiny-app.resolver";



const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./cabinet.component').then(c => c.CabinetComponent),
    children:[
      {
        path:'',
        loadComponent: () => import('./components/experiments/experiments.component').then(c => c.ExperimentsComponent),
        resolve: {data: AllExperimentResolver},
        // canActivate: [ExperimentsGuard]
      },
      {
        path:'shinyApp/:runId/:expId',
        loadComponent: () => import('./components/shiny-app/shiny-app.component').then(c => c.ShinyAppComponent),
        resolve: {data: ShinyAppResolver},
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }


