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
  MatProgressBarModule
} from '@angular/material';

import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { LightboxModule } from 'ngx-lightbox';
import {CrystalGalleryModule} from 'ngx-crystal-gallery';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
import { DragScrollModule } from 'ngx-drag-scroll';
import { FileUploadModule } from 'ng2-file-upload';


// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './_components/header/header.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { BuildingComponent } from './_pages/building/building.component';
import { LoginComponent } from './_pages/login/login.component';
import { HomeComponent } from './_pages/home/home.component';
import { AddBuildingComponent } from './_components/add-building/add-building.component';
import { HttpErrorHandler } from './_services/http-error-handler.service';
import { MessageService} from './_services/message.service';
import { ErrorPageComponent } from './_pages/error-page/error-page.component';
import { AddRoomComponent } from './_components/add-room/add-room.component';
import { CloneRoomComponent } from './_components/clone-room/clone-room.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { AddEquipmentComponent } from './_components/add-equipment/add-equipment.component';
import { SystemsComponent } from './_pages/systems/systems.component';
import { ProjectPlanningComponent } from './_pages/project-planning/project-planning.component';
import { RoomdetailComponent } from './_pages/roomdetail/roomdetail.component';
import { CarouselComponent } from './_components/carousel/carousel.component';
import { RoomsTableComponent } from './_components/rooms-table/rooms-table.component';
import { EquipmentModalComponent } from './_components/equipment-modal/equipment-modal.component';
import { EquipmentdetailComponent } from './_pages/equipmentdetail/equipmentdetail.component';
import { ReferComponent } from './_components/refer/refer.component';
import { AddNoteComponent } from './_components/add-note/add-note.component';
import { AddPhotosComponent } from './_components/upload-photos/upload-photos.component';
import { UploadDocumentComponent } from './_components/upload-document/upload-document.component';
import { ConfirmModalComponent } from './_components/confirm-modal/confirm-modal.component';
import {PrintDialogComponent} from './_components/print-dialog/print-dialog.component';
import {AddProjectDescComponent} from "./_components/add-project-desc/add-project-desc.component";
import {ContactUsComponent} from "./_components/contact-us/contact-us.component";
import {ProjectPlanningTableComponent} from "./_components/project-planning-table/project-planning-table.component";
import {ManageUserComponent} from "./_components/manage-user/manage-user.component";
import {AccountSettingsComponent} from "./_components/account-settings/account-settings.component";
import {MaxlengthDirective} from "./directive/maxlength.directive";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    BuildingComponent,
    LoginComponent,
    HomeComponent,
    AddBuildingComponent,
    ErrorPageComponent,
    AddRoomComponent,
    CloneRoomComponent,
    DashboardComponent,
    AddEquipmentComponent,
    SystemsComponent,
    ProjectPlanningComponent,
    RoomdetailComponent,
    EquipmentdetailComponent,
    CarouselComponent,
    RoomsTableComponent,
    ProjectPlanningTableComponent,
    EquipmentModalComponent,
    ReferComponent,
    AddNoteComponent,
    AddPhotosComponent,
    UploadDocumentComponent,
    ConfirmModalComponent,
    PrintDialogComponent,
    AddProjectDescComponent,
    ContactUsComponent,
    ManageUserComponent,
    AccountSettingsComponent,
    MaxlengthDirective
  ],
  entryComponents: [
    AddBuildingComponent,
    AddRoomComponent,
    CloneRoomComponent,
    AddEquipmentComponent,
    ReferComponent,
    AddNoteComponent,
    AddPhotosComponent,
    UploadDocumentComponent,
    ConfirmModalComponent,
    PrintDialogComponent,
    AddProjectDescComponent,
    ContactUsComponent,
    ManageUserComponent,
    AccountSettingsComponent
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
    FileUploadModule,
    MatGridListModule,
    MatTabsModule,
    MatSortModule,
    MatExpansionModule,
    MatProgressBarModule,
    NgxDropzoneModule,
    LightboxModule,
    CrystalGalleryModule,
    DragScrollModule,
    RouterModule.forRoot([]),
    NgxChartsModule
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
