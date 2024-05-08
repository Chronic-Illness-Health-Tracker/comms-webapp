import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, lastValueFrom, Subject, takeUntil } from 'rxjs';
import {
    HealthCondition,
    Patient,
    PatientControllerService,
    PatientStatus,
} from '../../../../api';
import { DatePipe, NgClass } from '@angular/common';
import { PageComponent } from '../../../base/page.component';
import { HeaderService } from '../../../svc/header.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
    selector: 'app-patient-viewer',
    standalone: true,
    imports: [DatePipe, NgClass, NgChartsModule],
    providers: [PatientControllerService],
    templateUrl: './patient-viewer.component.html',
    styleUrl: './patient-viewer.component.scss',
})
export class PatientViewerComponent
    implements OnInit, OnDestroy, PageComponent
{
    private patientId!: string;
    private onDestroy$ = new Subject<boolean>();

    protected patient?: Patient;
    protected patientConditions?: Array<HealthCondition>;
    protected recentStatus?: Array<PatientStatus>;

    protected chartData!: ChartData<ChartType, number[], string | string[]>;

    protected lineChartOptions: ChartConfiguration['options'] = {
        maintainAspectRatio: false,
    };

    constructor(
        private route: ActivatedRoute,
        private patientController: PatientControllerService,
        private headerService: HeaderService
    ) {
        this.setHeader();
    }

    setHeader(): void {
        this.headerService.header == 'patient';
    }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
            if (data['patientId']) {
                this.patientId = data['patientId'];
                this.loadPatient(this.patientId);
            }
        });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(true);
        this.onDestroy$.complete;
    }

    loadPatient(patientId: string) {
        lastValueFrom(this.patientController.getPatient(patientId)).then(
            result => {
                this.patient = result;
            }
        );

        lastValueFrom(this.patientController.getConditions(patientId)).then(
            result => {
                this.patientConditions = result;

                if (result[0]) {
                    this.getStatus(result[0].id!);
                }
            }
        );
    }

    displayName(firstname?: string, middleNames?: string, lastname?: string) {
        return `${firstname} ${middleNames} ${lastname}`;
    }

    displayAddress(
        addresslineOne?: string,
        addresslineTwo?: string,
        postcode?: string
    ) {
        return `${addresslineOne}, ${addresslineTwo}, ${postcode}`;
    }

    selectChanged(event: any) {
        this.getStatus(event.target.value);
    }

    getStatus(conditionId: string) {
        lastValueFrom(
            this.patientController.getStatus(this.patientId, conditionId)
        ).then(result => {
            this.recentStatus = result;
        });
    }
}
