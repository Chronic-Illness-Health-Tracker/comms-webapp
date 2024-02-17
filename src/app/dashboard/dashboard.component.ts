import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../base/page.component';
import { HeaderService } from '../svc/header.service';
import { ChartsComponent } from '../charts/charts.component';
import { ConditionFilterPanelComponent } from '../condition-filter-panel/condition-filter-panel.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [ChartsComponent, ConditionFilterPanelComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements PageComponent {
    stubFilterItems = [
        { name: 'Hypertrophic Cardiomyopathy', shortname: 'HCM' },
        { name: 'Heart Failure', shortname: null },
        { name: 'Arrhythmia', shortname: null },
        { name: 'Short QT Syndrome', shortname: 'SQTS' },
        {
            name: 'Catecholaminergic Polymorphic Ventricular Tachycardia',
            shortname: 'CPVT',
        },
        { name: 'Brugada syndrome', shortname: null },
        { name: 'Acyanotic heart disease', shortname: null },
    ];
    constructor(private headerService: HeaderService) {
        this.setHeader();
    }

    setHeader(): void {
        this.headerService.header = 'dashboard';
    }
}
