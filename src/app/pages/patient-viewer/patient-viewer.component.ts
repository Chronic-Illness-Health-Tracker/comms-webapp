import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, lastValueFrom, Subject, takeUntil } from 'rxjs';
import { Patient, PatientControllerService } from '../../../api';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-patient-viewer',
    standalone: true,
    imports: [DatePipe],
    providers: [PatientControllerService],
    templateUrl: './patient-viewer.component.html',
    styleUrl: './patient-viewer.component.scss',
})
export class PatientViewerComponent implements OnInit, OnDestroy {
    protected patient?: Patient;
    private onDestroy$ = new Subject<boolean>();
    constructor(
        private route: ActivatedRoute,
        private patientController: PatientControllerService
    ) {}

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
            if (data['patientId'] === true) {
                const patientId = data['patientId'];
                this.loadPatient(patientId);
            }
        });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(true);
        this.onDestroy$.complete;
    }

    loadPatient(patientId: string) {
        lastValueFrom(this.patientController.getPatient(patientId)).then(
            value => {
                this.patient = value;
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
}
