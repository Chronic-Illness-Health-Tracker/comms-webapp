import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageComponent } from '../../base/page.component';
import { HeaderService } from '../../svc/header.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientDetailsCardComponent } from '../../components/patient-details-card/patient-details-card.component';
import { GpDetailsCardComponent } from '../../components/gp-details-card/gp-details-card.component';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../../api/model/patient';
import { Gp, PatientControllerService } from '../../../api';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AddPatientCardComponent } from '../../components/add-patient-card/add-patient-card.component';

@Component({
    selector: 'app-patient-editor',
    standalone: true,
    imports: [
        NgbDropdownModule,
        PatientDetailsCardComponent,
        GpDetailsCardComponent,
        AddPatientCardComponent,
        FormsModule,
    ],
    providers: [PatientControllerService],
    templateUrl: './patient-editor.component.html',
    styleUrl: './patient-editor.component.scss',
})
export class PatientEditorComponent
    implements PageComponent, OnInit, OnDestroy
{
    private onDestroy$ = new Subject<boolean>();
    private _patientValid: boolean = false;
    private _gpValid: boolean = false;
    protected editMode: boolean = false;
    protected creatingNewPatient = false;
    protected patientSearch = '';

    protected patientSearchList?: Array<Patient>;
    protected patient?: Patient;
    protected gp?: Gp;

    protected submitted: boolean = false;

    constructor(
        private headerService: HeaderService,
        private patientService: PatientControllerService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.setHeader();

        this.route.data.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
            if (data['editing'] === true) {
                this.editMode = true;
            }
        });

        this.route.paramMap
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(values => {
                if (values.get('patientId') !== null) {
                    const patientId = values.get('patientId') as string;
                    this.getPatient(patientId);
                }
            });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(true);
        this.onDestroy$.complete;
    }

    setHeader(): void {
        this.headerService.header = 'Patient';
    }

    createNewPatient(value: boolean) {
        this.creatingNewPatient = value;
    }

    onPatientChanges(patient: Patient) {
        this.patient = patient;
    }

    selectedPatient(patient: Patient) {
        this.onPatientChanges(patient);
        this.onGpChange(patient?.gp);
    }

    onGpChange(gp?: Gp | null) {
        if (gp) {
            this.gp = gp;
        }
    }

    patientValid(valid: boolean) {
        this._patientValid = valid;
    }

    gpValid(valid: boolean) {
        this._gpValid = valid;
    }

    getPatient(patientId: string) {
        lastValueFrom(this.patientService.getPatient(patientId))
            .then(result => {
                this.patient = result;
                this.gp = this.patient.gp;
            })
            .catch();
    }

    savePatient() {
        this.submitted = true;
        if (this._patientValid && this._gpValid) {
            if (this.patient) {
                this.patient.gp = this.gp;

                lastValueFrom(this.patientService.createPatient(this.patient))
                    .then()
                    .catch();
            }
        }
    }
}
