import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/clinician/dashboard/dashboard.component';
import { PatientEditorComponent } from './pages/clinician/patient-editor/patient-editor.component';
import { HealthConditionEditorComponent } from './pages/clinician/health-condition-editor/health-condition-editor.component';
import { PatientViewerComponent } from './pages/clinician/patient-viewer/patient-viewer.component';
import { CreateAccountComponent } from './pages/clinician/create-account/create-account.component';
import { VerifyLoginComponent } from '@helphi/helphi-common-ui';
import { HomeComponent } from './pages/patient/home/home.component';
import { ConditionCheckInComponent } from './pages/patient/condition-check-in/condition-check-in.component';

export const routes: Routes = [
    { path: 'verify', component: VerifyLoginComponent },
    {
        path: 'account',
        children: [{ path: 'create', component: CreateAccountComponent }],
    },
    {
        path: 'clinician',
        children: [
            { path: 'dashboard', component: DashboardComponent },
            {
                path: 'condition',
                children: [
                    { path: 'new', component: HealthConditionEditorComponent },
                    {
                        path: ':conditionId',
                        children: [
                            {
                                path: 'edit',
                                component: HealthConditionEditorComponent,
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
                        children: [
                            {
                                path: 'edit',
                                component: PatientEditorComponent,
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
            { path: 'home', component: HomeComponent },
            {
                path: 'condition',
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
