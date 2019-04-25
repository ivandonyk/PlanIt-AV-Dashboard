import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconRegistry,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatDialogModule,
  MatListModule,
  MatTableModule,
  MatSnackBarModule, MatSelectModule, MatDatepickerModule,
} from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';


// import { FlexLayoutModule} from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSortModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './_components/header/header.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { MasterListComponent } from './_pages/master-list/master-list.component';
import { AppRoutingModule } from './app-routing.module';
import { BuildingComponent } from './_pages/building/building.component';
import { LoginComponent } from './_pages/login/login.component';
import { HomeComponent } from './_pages/home/home.component';
import { AddBuildingComponent } from './_components/header/add-building/add-building.component';
import { HttpErrorHandler } from './_services/http-error-handler.service';
import {MessageService} from './_services/message.service';
import { ErrorPageComponent } from './_pages/error-page/error-page.component';
import { AddRoomComponent } from './_components/header/add-room/add-room.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { AddEquipmentComponent } from './_components/header/add-equipment/add-equipment.component';
import { SystemsComponent } from './_pages/systems/systems.component';
import { ProjectPlanningComponent } from './_pages/project-planning/project-planning.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MasterListComponent,
    BuildingComponent,
    LoginComponent,
    HomeComponent,
    AddBuildingComponent,
    ErrorPageComponent,
    AddRoomComponent,
    DashboardComponent,
    AddEquipmentComponent,
    SystemsComponent,
    ProjectPlanningComponent
  ],
  entryComponents: [
    AddBuildingComponent,
    AddRoomComponent,
    AddEquipmentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTableModule,
    MatGridListModule,
    MatTabsModule,
    MatSortModule,
    MatExpansionModule,
    RouterModule.forRoot([])
    // FlexLayoutModule,

  ],
  providers: [
    HttpErrorHandler,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
