import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PatientControllerService, PatientStatus } from '../../../api';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-patient-status-table',
    standalone: true,
    imports: [],
    templateUrl: './patient-status-table.component.html',
    styleUrl: './patient-status-table.component.scss',
})
export class PatientStatusTableComponent implements OnChanges {
    @Input() patientId?: string;
    @Input() conditionId?: string;

    protected statuses: Array<PatientStatus> = [];

    constructor(private patientController: PatientControllerService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.patientId && this.conditionId) {
            this.loadStatuses();
        }
    }

    loadStatuses() {
        lastValueFrom(
            this.patientController.getStatus(
                this.patientId as string,
                this.conditionId as string
            )
        ).then(value => {
            this.statuses = value;
        });
    }
}
