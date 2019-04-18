import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DashboardComponent} from '../../_pages/dashboard/dashboard.component';


const sidebarRoutes: Routes = [
  { path: 'dashboard',  component: DashboardComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(sidebarRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SidebarRoutesModule {}
