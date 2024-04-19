import {
    Component,
    EventEmitter,
    Injectable,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Patient } from '../../../../api/model/patient';
import { Subject, takeUntil } from 'rxjs';
import {
    NgbDateParserFormatter,
    NgbDateStruct,
    NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgClass } from '@angular/common';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
    readonly DELIMITER = '/';

    parse(value: string): NgbDateStruct | null {
        if (value) {
            const date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10),
            };
        }
        return null;
    }

    format(date: NgbDateStruct | null): string {
        return date
            ? date.day +
                  this.DELIMITER +
                  date.month +
                  this.DELIMITER +
                  date.year
            : '';
    }
}

@Component({
    selector: 'app-patient-details-card',
    standalone: true,
    imports: [NgbDatepickerModule, FormsModule, ReactiveFormsModule, NgClass],
    providers: [
        {
            provide: NgbDateParserFormatter,
            useClass: CustomDateParserFormatter,
        },
    ],
    templateUrl: './patient-details-card.component.html',
    styleUrl: './patient-details-card.component.scss',
})
export class PatientDetailsCardComponent
    implements OnInit, OnDestroy, OnChanges
{
    private onDestroy$ = new Subject<boolean>();

    protected get maxDate(): NgbDateStruct {
        const date = new Date();
        return {
            year: date.getUTCFullYear(),
            month: date.getUTCMonth(),
            day: date.getUTCDate(),
        };
    }
    protected get titleValues(): Array<Patient.TitleEnum> {
        return Object.values(Patient.TitleEnum);
    }
    @Input() submitted: boolean = false;
    @Input() editable: boolean = false;
    @Input() patient?: Patient;
    @Output() changes = new EventEmitter<Patient>();
    @Output() valid = new EventEmitter<boolean>();

    protected form = this.fb.group({
        id: this.fb.nonNullable.control(''),
        nhsNumber: this.fb.nonNullable.control('', Validators.required),
        dateOfBirth: this.fb.nonNullable.control<NgbDateStruct | undefined>(
            undefined,
            Validators.required
        ),
        title: this.fb.nonNullable.control<Patient.TitleEnum | undefined>(
            undefined,
            Validators.required
        ),
        forename: this.fb.nonNullable.control('', Validators.required),
        middlenames: this.fb.nonNullable.control(''),
        lastname: this.fb.nonNullable.control('', Validators.required),
        contactNumber: this.fb.nonNullable.control('', Validators.required),
        alternateContactNumber: this.fb.nonNullable.control(''),
        email: this.fb.nonNullable.control(''),
        address: this.fb.nonNullable.group({
            id: this.fb.nonNullable.control(''),
            addresslineOne: this.fb.nonNullable.control(
                '',
                Validators.required
            ),
            addresslineTwo: this.fb.nonNullable.control(''),
            postcode: this.fb.nonNullable.control('', Validators.required),
        }),
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        if (!this.editable) {
            this.form.disable();
        }

        this.patchForm();
        this.form.valueChanges
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(() => {
                const formValue = this.form.value;
                const patient: Omit<Patient, 'dateOfBirth'> = formValue;

                if (formValue.dateOfBirth) {
                    const dobAsDate = new Date(
                        formValue.dateOfBirth.year,
                        formValue.dateOfBirth.month,
                        formValue.dateOfBirth.day
                    );

                    (patient as Patient).dateOfBirth = dobAsDate;
                    patient.gp = this.patient?.gp;
                    patient.conditions = this.patient?.conditions;
                }

                if (this.form.valid || this.editable == false) {
                    this.changes.emit(patient);
                }

                this.editable
                    ? this.valid.emit(this.form.valid)
                    : this.valid.emit(true);
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.patchForm();
        if (this.editable) {
            this.form.enable();
        } else {
            this.form.disable();
        }
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(true);
        this.onDestroy$.complete;
    }

    patchForm() {
        if (this.patient) {
            const patientNoDob: Omit<Patient, 'dateOfBirth'> = this.patient;

            this.form.patchValue(patientNoDob);

            if (this.patient.dateOfBirth) {
                const dob = new Date(this.patient.dateOfBirth);
                this.form.patchValue({
                    dateOfBirth: {
                        year: dob.getUTCFullYear(),
                        month: dob.getUTCMonth(),
                        day: dob.getUTCDate(),
                    },
                });
            }

            this.valid.emit(this.form.valid);
        }
    }
}
