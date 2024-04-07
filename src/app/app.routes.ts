import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientEditorComponent } from './pages/patient-editor/patient-editor.component';
import { HealthConditionEditorComponent } from './pages/health-condition-editor/health-condition-editor.component';
import { PatientViewerComponent } from './pages/patient-viewer/patient-viewer.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
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
];
