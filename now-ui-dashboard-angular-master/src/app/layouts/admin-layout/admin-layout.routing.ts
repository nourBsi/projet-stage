import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { FormateurComponent } from '../../formateur/formateur.component';
import { DetailsFormateurComponent } from '../../details/details-formateur/details-formateur.component';
import { AddFormateurComponent } from '../../forms/add-formateur/add-formateur.component';
import { ParticipantComponent } from '../../participant/participant.component';
import { DetailsParticipantComponent } from '../../details/details-participant/details-participant.component';
import { AddParticipantComponent } from '../../forms/add-participant/add-participant.component';
import { CycleComponent } from '../../cycle/cycle.component';
import { DetailsCycleComponent } from '../../details/details-cycle/details-cycle.component';
import { AddCycleComponent } from '../../forms/add-cycle/add-cycle.component';
import { AffectFormateurComponent } from '../../affect/affect-formateur/affect-formateur.component';
import { AffectParticipantComponent } from '../../affect/affect-participant/affect-participant.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'acceuil',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'formateur',        component: FormateurComponent },
    { path: 'detailsFormateur/:id', component: DetailsFormateurComponent },
    { path: 'addFormateur', component: AddFormateurComponent },
    { path: 'participant', component: ParticipantComponent },
    { path:  'detailsParticipant/:id', component: DetailsParticipantComponent },
    { path:  'addParticipant', component: AddParticipantComponent },
    { path:  'cycle', component: CycleComponent },
    { path:  'detailsCycle/:id', component: DetailsCycleComponent },
    { path:  'addCycle', component: AddCycleComponent },
    { path:  'addCycle', component: AddCycleComponent },
    { path:  'affectFormateur', component: AffectFormateurComponent },
    { path:  'affectParticipant', component: AffectParticipantComponent }



    

];
