import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    HelphiContainerComponent,
    SidebarConfig,
} from '@helphi/helphi-common-ui';

import { HeaderService } from './svc/header.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HelphiContainerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    constructor(protected headerService: HeaderService) {}
    title = 'comms-webapp';

    sidebarConfig: SidebarConfig = {
        showAddDropdown: true,
        canAddPatients: true,
        canAddConditions: true,
        addPatientRoute: ['patient', 'new'],
        addConditionRoute: [],
    };

    sidebarContent = [
        'Hypertrophic Cardiomyopathy (HCM)',
        'Heart Failure',
        'Arrhythmia',
        'Short QT Syndrome (SQTS)',
        'Catecholaminergic Polymorphic Ventricular Tachycardia (CPVT)',
        'Brugada syndrome',
        'Acyanotic heart disease',
    ];
}
