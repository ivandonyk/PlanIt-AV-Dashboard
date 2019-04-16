import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import {ErrorPageComponent} from './error-page/error-page.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'error', component : ErrorPageComponent},
  { path: '', component: LoginComponent},
  { path: '**', redirectTo: '/login', pathMatch: 'full'},
  // { path: 'master', outlet: 'sidebarRoute', component: MasterListComponent},
  // { path: 'building', outlet: 'sidebarRoute', component: BuildingComponent},
  // { path: '', redirectTo: '/login', pathMatch: 'full'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true,
        
      }
    )

  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
