import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    HelphiContainerComponent,
    SidebarConfig,
} from '@helphi/helphi-common-ui';

import { HeaderService } from './svc/header.service';
import { HealthCondition, HealthConditionControllerService } from '../api';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HelphiContainerComponent],
    providers: [HealthConditionControllerService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    constructor(
        protected headerService: HeaderService,
        private healthConditionService: HealthConditionControllerService
    ) {}

    title = 'comms-webapp';

    sidebarConfig: SidebarConfig = {
        showAddDropdown: true,
        canAddPatients: true,
        canAddConditions: true,
        addPatientRoute: ['patient', 'new'],
        addConditionRoute: ['condition', 'new'],
    };

    sidebarContent: Array<{ content: string; route: Array<string> }> = [];

    async ngOnInit(): Promise<void> {
        const conditions = await lastValueFrom(
            this.healthConditionService.listHealthConditions()
        );

        this.sidebarContent = conditions.map(condition => {
            return {
                content: condition.name!,
                route: ['condition', condition.id!],
            };
        });
    }
}
