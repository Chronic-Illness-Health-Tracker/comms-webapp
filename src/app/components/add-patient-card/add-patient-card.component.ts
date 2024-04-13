import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {
    HealthCondition,
    HealthConditionControllerService,
    Patient,
    PatientControllerService,
} from '../../../api';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-add-patient-card',
    standalone: true,
    imports: [FormsModule, NgbDropdownModule],
    providers: [PatientControllerService, HealthConditionControllerService],
    templateUrl: './add-patient-card.component.html',
    styleUrl: './add-patient-card.component.scss',
})
export class AddPatientCardComponent implements OnInit {
    protected patients: Array<Patient> = [];
    protected conditions: Array<HealthCondition> = [];
    protected creatingNewPatient: boolean = false;
    protected _selectedPatient?: Patient;
    protected _selectedCondition?: HealthCondition;

    protected patientSearch = '';

    @Output() selectedPatient = new EventEmitter<Patient>();
    @Output() creatingNew = new EventEmitter<boolean>();
    @Output() selectedHealthCondition = new EventEmitter<HealthCondition>();

    constructor(
        private patientService: PatientControllerService,
        private conditionService: HealthConditionControllerService
    ) {}

    ngOnInit(): void {
        this.getPatients();
        this.getConditions();
    }

    getPatients(value?: string) {
        lastValueFrom(this.patientService.getPatients(value)).then(result => {
            this.patients = result;
        });
    }

    getConditions() {
        lastValueFrom(this.conditionService.listHealthConditions()).then(
            result => {
                this.conditions = result;
            }
        );
    }

    patientSelected(patient: Patient) {
        this._selectedPatient = patient;
        this.selectedPatient.emit(patient);
    }

    conditionSelected(condition: HealthCondition) {
        this._selectedCondition = condition;
        this.selectedHealthCondition.emit(condition);
    }

    createNewPatient() {
        this.creatingNewPatient = true;
        this.creatingNew.emit(true);
    }

    //add debounce here
    patientSearchChanged(value: string) {
        this.getPatients(value);
    }

    patientName(patient: Patient) {
        return `${patient.forename} ${patient.lastname} (${patient.nhsNumber})`;
    }
}
