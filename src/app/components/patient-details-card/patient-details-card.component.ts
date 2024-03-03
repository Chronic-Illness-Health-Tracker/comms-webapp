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
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Patient } from '../../../api/model/patient';
import { Subject, takeUntil } from 'rxjs';
import {
    NgbDate,
    NgbDateAdapter,
    NgbDateParserFormatter,
    NgbDateStruct,
    NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

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
    imports: [NgbDatepickerModule, FormsModule, ReactiveFormsModule],
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

    @Input() editable: boolean = false;
    @Input() patient?: Patient;
    @Output() changes = new EventEmitter<Patient>();

    protected form = this.fb.group({
        nhsNumber: this.fb.nonNullable.control(''),
        dateOfBirth: this.fb.nonNullable.control<NgbDateStruct>({
            year: 2000,
            month: 1,
            day: 1,
        }),
        title: this.fb.nonNullable.control<Patient.TitleEnum>(
            Patient.TitleEnum.Mr
        ),
        forename: this.fb.nonNullable.control(''),
        middlenames: this.fb.nonNullable.control(''),
        lastname: this.fb.nonNullable.control(''),
        contactNumber: this.fb.nonNullable.control(''),
        alternateContactNumber: this.fb.nonNullable.control(''),
        email: this.fb.nonNullable.control(''),
        address: this.fb.nonNullable.group({
            addresslineOne: this.fb.nonNullable.control(''),
            addresslineTwo: this.fb.nonNullable.control(''),
            postcode: this.fb.nonNullable.control(''),
        }),
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        if (!this.editable) {
            this.form.disable();
        }

        if (this.patient) {
            const patientNoDob: Omit<Patient, 'dateOfBirth'> = this.patient;

            this.form.patchValue(patientNoDob);

            if (this.patient.dateOfBirth) {
                this.form.patchValue({
                    dateOfBirth: {
                        year: this.patient.dateOfBirth.getUTCFullYear(),
                        month: this.patient.dateOfBirth.getUTCMonth(),
                        day: this.patient.dateOfBirth.getUTCDate(),
                    },
                });
            }
        }
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

                this.changes.emit(patient);
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
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
}
