import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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

    protected unwellPatients: number = 0;
    protected normalPatients: number = 0;
    protected subclinicalPatients: number = 0;
    protected dontRender: boolean = false;

    private onDestroy$ = new Subject<boolean>();

    tableData: Array<{
        patientId: string;
        name: string;
        nhsNumber: string;
        conditionName: string;
        conditionStatus: string;
    }> = [];
    filteredTableData: Array<{
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
        private patientService: PatientControllerService,
        private ref: ChangeDetectorRef
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
                    this.filteredTableData.push(createdPatient);

                    this.dontRender = true;
                    this.ref.detectChanges();
                    this.dontRender = false;
                });
            });
        });
    }

    onFilterChanged(conditions: Array<HealthCondition>) {
        this.filteredTableData = this.tableData.filter(item => {
            const conditionName = item.conditionName;
            return conditions.find(condition => {
                return condition.shortName === conditionName;
            });
        });

        this.unwellPatients = 0;
        this.subclinicalPatients = 0;
        this.normalPatients = 0;
        this.filteredTableData.forEach(item => {
            switch (item.conditionStatus) {
                case 'unwell':
                    this.unwellPatients++;
                    break;
                case 'Normal':
                    this.normalPatients++;
                    break;
                case 'Subclinical':
                    this.subclinicalPatients++;
                    break;
            }
        });

        this.dontRender = true;
        this.ref.detectChanges();
        this.dontRender = false;
    }
}
