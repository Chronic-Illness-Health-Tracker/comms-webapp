import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageComponent } from '../../base/page.component';
import { HeaderService } from '../../svc/header.service';
import { ChartsComponent } from '../../components/charts/charts.component';
import { ConditionFilterPanelComponent } from '../../components/condition-filter-panel/condition-filter-panel.component';
import { DashboardPreviewComponent } from '../../components/dashboard/dashboard-preview/dashboard-preview.component';
import { ActivatedRoute } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        ChartsComponent,
        ConditionFilterPanelComponent,
        DashboardPreviewComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements PageComponent, OnDestroy {
    protected extended: boolean = false;

    private onDestroy$ = new Subject<boolean>();

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

    stubTableData = [
        {
            name: 'Jason response',
            nhsNumber: '831 602 8926',
            conditionName: 'CPVT',
            conditionStatus: 'Unwell',
        },
        {
            name: 'Miles Tone',
            nhsNumber: '802 298 5013',
            conditionName: 'SQTS',
            conditionStatus: 'Unwell',
        },
        {
            name: 'Jake weary Tone',
            nhsNumber: '616 781 9056',
            conditionName: 'Heart Failure',
            conditionStatus: 'Sub-clinical',
        },
        {
            name: 'Jake weary Tone',
            nhsNumber: '616 781 9056',
            conditionName: 'Heart Failure',
            conditionStatus: 'Normal',
        },
    ];
    constructor(
        private headerService: HeaderService,
        private activatedRoute: ActivatedRoute
    ) {
        this.setHeader();

        this.activatedRoute.queryParams
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(params => {
                this.extended = params['extended'] === 'true' ? true : false;
            });
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }

    setHeader(): void {
        this.headerService.header = 'dashboard';
    }
}
