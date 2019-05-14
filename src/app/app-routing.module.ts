import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './_pages/login/login.component';
import { HomeComponent } from './_pages/home/home.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import {ErrorPageComponent} from './_pages/error-page/error-page.component';
import { SystemsComponent } from './_pages/systems/systems.component';
import { ProjectPlanningComponent } from './_pages/project-planning/project-planning.component';
import { AuthGuard } from './_guards/auth.guard';
import {RoomdetailComponent} from './_pages/roomdetail/roomdetail.component';
import {EquipmentdetailComponent} from './_pages/equipmentdetail/equipmentdetail.component';


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
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'systems',
        component: SystemsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'project-planning',
        component: ProjectPlanningComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'room-detail/:id/:id',
        component: RoomdetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'equipment-detail/:id',
        component: EquipmentdetailComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
  { path: '**', redirectTo: '/error', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
