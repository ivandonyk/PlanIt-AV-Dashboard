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

// import { FlexLayoutModule} from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MasterListComponent } from './master-list/master-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BuildingComponent } from './building/building.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddBuildingComponent } from './header/add-building/add-building.component';
import { HttpErrorHandler } from './http-error-handler.service';
import {MessageService} from './message.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddRoomComponent } from './header/add-room/add-room.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEquipmentComponent } from './header/add-equipment/add-equipment.component';


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
    MatTableModule,
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
    // FlexLayoutModule,

  ],
  providers: [HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
