import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormateurComponent } from '../../formateur/formateur.component';
import { DetailsFormateurComponent } from '../../details/details-formateur/details-formateur.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddFormateurComponent } from '../../forms/add-formateur/add-formateur.component';
import { ParticipantComponent } from '../../participant/participant.component';
import { DetailsParticipantComponent } from '../../details/details-participant/details-participant.component';
import { AddParticipantComponent } from '../../forms/add-participant/add-participant.component';
import { CycleComponent } from '../../cycle/cycle.component';
import { DetailsCycleComponent } from '../../details/details-cycle/details-cycle.component';
import { AddCycleComponent } from '../../forms/add-cycle/add-cycle.component';
import { AffectFormateurComponent } from '../../affect/affect-formateur/affect-formateur.component';
import { AffectParticipantComponent } from '../../affect/affect-participant/affect-participant.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
   
 
    ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    FormateurComponent,
    DetailsFormateurComponent,
    AddFormateurComponent,
    ParticipantComponent,
    DetailsParticipantComponent,
    AddParticipantComponent,
    CycleComponent,
    DetailsCycleComponent,
    AddCycleComponent,
    AffectFormateurComponent,
    AffectParticipantComponent,
   
  ]
})

export class AdminLayoutModule {}
