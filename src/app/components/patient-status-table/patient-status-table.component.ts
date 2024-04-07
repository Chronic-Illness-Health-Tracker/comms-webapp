import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-patient-status-table',
    standalone: true,
    imports: [],
    templateUrl: './patient-status-table.component.html',
    styleUrl: './patient-status-table.component.scss',
})
export class PatientStatusTableComponent implements OnChanges {
    @Input() patientId?: string;

    ngOnChanges(changes: SimpleChanges): void {
        if (this.patientId) {
        }
    }
}
