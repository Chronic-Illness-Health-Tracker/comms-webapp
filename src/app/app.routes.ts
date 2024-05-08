import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/clinician/dashboard/dashboard.component';
import { PatientEditorComponent } from './pages/clinician/patient-editor/patient-editor.component';
import { HealthConditionEditorComponent } from './pages/clinician/health-condition-editor/health-condition-editor.component';
import { PatientViewerComponent } from './pages/clinician/patient-viewer/patient-viewer.component';
import { CreateAccountComponent } from './pages/registration/create-account/create-account.component';
import { VerifyLoginComponent } from '@helphi/helphi-common-ui';
import { HomeComponent } from './pages/patient/home/home.component';
import { ConditionCheckInComponent } from './pages/patient/condition-check-in/condition-check-in.component';
import { clinicianGuard } from './guards/clinician.guard';
import { patientGuard } from './guards/patient.guard';
import { AlternateRedirectComponent } from './components/alternate-redirect/alternate-redirect.component';

export const routes: Routes = [
    { path: '', component: AlternateRedirectComponent },
    { path: 'verify', component: VerifyLoginComponent },
    {
        path: 'account',
        children: [{ path: 'create', component: CreateAccountComponent }],
    },
    {
        path: 'clinician',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [clinicianGuard],
            },
            {
                path: 'condition',
                children: [
                    {
                        path: 'new',
                        component: HealthConditionEditorComponent,
                        canActivate: [clinicianGuard],
                    },
                    {
                        path: ':conditionId',
                        children: [
                            {
                                path: 'edit',
                                component: HealthConditionEditorComponent,
                                canActivate: [clinicianGuard],
                                data: { editing: true },
                            },
                        ],
                    },
                ],
            },
            {
                path: 'patient',
                children: [
                    { path: 'new', component: PatientEditorComponent },
                    {
                        path: ':patientId',
                        component: PatientViewerComponent,
                        canActivate: [clinicianGuard],
                        children: [
                            {
                                path: 'edit',
                                component: PatientEditorComponent,
                                canActivate: [clinicianGuard],
                                data: { editing: true },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: 'patient',
        children: [
            {
                path: 'home',
                component: HomeComponent,
                canActivate: [patientGuard],
            },
            {
                path: 'condition',
                canActivate: [patientGuard],
                children: [
                    {
                        path: ':conditionId',
                        component: ConditionCheckInComponent,
                    },
                ],
            },
        ],
    },
];
