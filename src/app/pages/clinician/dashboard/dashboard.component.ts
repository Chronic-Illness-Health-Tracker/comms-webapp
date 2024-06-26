import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageComponent } from '../../../base/page.component';
import { HeaderService } from '../../../svc/header.service';
import { ActivatedRoute } from '@angular/router';
import {
    forkJoin,
    lastValueFrom,
    Observable,
    ObservableInput,
    Subject,
    takeUntil,
} from 'rxjs';
import {
    HealthCondition,
    HealthConditionControllerService,
    Patient,
    PatientControllerService,
    PatientStatus,
} from '../../../../api';
import { ChartsComponent } from '../../../components/clinician/charts/charts.component';
import { ConditionFilterPanelComponent } from '../../../components/clinician/condition-filter-panel/condition-filter-panel.component';
import { DashboardPreviewComponent } from '../../../components/clinician/dashboard/dashboard-preview/dashboard-preview.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        ChartsComponent,
        ConditionFilterPanelComponent,
        DashboardPreviewComponent,
    ],
    providers: [HealthConditionControllerService, PatientControllerService],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements PageComponent, OnDestroy, OnInit {
    protected extended: boolean = false;
    protected conditions?: Array<HealthCondition>;

    private onDestroy$ = new Subject<boolean>();

    tableData: Array<{
        patientId: string;
        name: string;
        nhsNumber: string;
        conditionName: string;
        conditionStatus: string;
    }> = [];
    constructor(
        private headerService: HeaderService,
        private activatedRoute: ActivatedRoute,
        private healthConditionService: HealthConditionControllerService,
        private patientService: PatientControllerService
    ) {
        this.setHeader();

        this.activatedRoute.queryParams
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(params => {
                this.extended = params['extended'] === 'true' ? true : false;
            });
    }
    async ngOnInit(): Promise<void> {
        lastValueFrom(this.loadConditions()).then(result => {
            this.conditions = result;
        });

        await this.loadPatients();
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }

    setHeader(): void {
        this.headerService.header = 'dashboard';
    }

    loadConditions() {
        return this.healthConditionService.listHealthConditions();
    }

    async loadPatients() {
        const patients = await lastValueFrom(this.patientService.getPatients());

        patients.forEach(patient => {
            patient.conditions?.forEach(condition => {
                lastValueFrom(
                    this.patientService.getRecentStatus(
                        patient.id!,
                        condition.id!
                    )
                ).then(patientStatus => {
                    const patientName = `${patient.forename!} ${patient.lastname!}`;
                    const patientNhsNumber = patient.nhsNumber!;
                    const conditionName = condition.shortName!;
                    const status = patientStatus.status!.toString();

                    const createdPatient = {
                        patientId: patient.id!,
                        name: patientName,
                        nhsNumber: patientNhsNumber,
                        conditionName: conditionName,
                        conditionStatus: status,
                    };

                    this.tableData.push(createdPatient);
                });
            });
        });
    }
}
