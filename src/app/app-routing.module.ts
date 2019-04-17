import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import { SystemsComponent } from './systems/systems.component';
import { ProjectPlanningComponent } from './project-planning/project-planning.component';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'error',
    component : ErrorPageComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'systems',
        component: SystemsComponent
      },
      {
        path: 'project-planning',
        component: ProjectPlanningComponent
      }
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full'},
  // { path: 'master', outlet: 'sidebarRoute', component: MasterListComponent},
  // { path: 'building', outlet: 'sidebarRoute', component: BuildingComponent},
  // { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
