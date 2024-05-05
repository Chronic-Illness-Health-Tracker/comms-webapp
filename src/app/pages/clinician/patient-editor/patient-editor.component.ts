import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageComponent } from '../../../base/page.component';
import { HeaderService } from '../../../svc/header.service';
import { PatientDetailsCardComponent } from '../../../components/clinician/patient-details-card/patient-details-card.component';
import { GpDetailsCardComponent } from '../../../components/clinician/gp-details-card/gp-details-card.component';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../../../api/model/patient';
import {
    Gp,
    HealthCondition,
    PatientControllerService,
    RegistrationControllerService,
    UserType,
} from '../../../../api';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SaveBarComponent } from '../../../components/clinician/save-bar/save-bar.component';
import { RegistrationCodeModalComponent } from '../../../components/clinician/registration-code-modal/registration-code-modal.component';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPatientCardComponent } from '../../../components/clinician/add-patient-card/add-patient-card.component';
import { Severity, Toast, ToastService } from '../../../svc/toast.service';

@Component({
    selector: 'app-patient-editor',
    standalone: true,
    imports: [
        NgbDropdownModule,
        PatientDetailsCardComponent,
        GpDetailsCardComponent,
        AddPatientCardComponent,
        FormsModule,
        SaveBarComponent,
    ],
    providers: [PatientControllerService, RegistrationControllerService],
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

    private newConditionToAdd?: HealthCondition;

    constructor(
        private headerService: HeaderService,
        private patientService: PatientControllerService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private registrationService: RegistrationControllerService,
        private toaster: ToastService
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

    selectedHealthCondition(condition?: HealthCondition) {
        this.newConditionToAdd = condition;
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

                if (this.creatingNewPatient) {
                    lastValueFrom(
                        this.patientService.createPatient(this.patient)
                    )
                        .then(result => {
                            this.createPatientRegistration(result.id!);
                            this.toaster.show(
                                'Patient created',
                                Severity.success,
                                5000
                            );
                        })
                        .catch(() => {
                            this.toaster.show('There was an error creating the patient', Severity.danger, 5000);                
                        }    
                    );
                } else {
                    if (this.newConditionToAdd) {
                        this.patient.conditions?.push(this.newConditionToAdd);
                    }
                    lastValueFrom(
                        this.patientService.updatePatient(this.patient)
                    )
                        .then(() => {
                            this.toaster.show(
                                'Patient updated',
                                Severity.success,
                                5000
                            );
                        })
                        .catch();
                }
            }
        }
    }

    createPatientRegistration(patientId: string) {
        lastValueFrom(
            this.registrationService.createRegistrationCode(
                patientId,
                UserType.TypeEnum.PATIENT
            )
        ).then(result => {
            const modalRef = this.modalService.open(
                RegistrationCodeModalComponent
            );
            modalRef.componentInstance.registrationCode = result.code;
        });
    }
}
