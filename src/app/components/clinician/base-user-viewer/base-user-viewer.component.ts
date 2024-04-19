import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BaseUser, Patient } from '../../../../api';

@Component({
    selector: 'app-base-user-viewer',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './base-user-viewer.component.html',
    styleUrl: './base-user-viewer.component.scss',
})
export class BaseUserViewerComponent implements OnChanges, OnInit {
    @Input() user?: BaseUser;

    protected get titleValues(): Array<Patient.TitleEnum> {
        return Object.values(Patient.TitleEnum);
    }
    protected form = this.fb.group({
        id: this.fb.nonNullable.control(''),
        title: this.fb.nonNullable.control<Patient.TitleEnum | undefined>(
            undefined
        ),
        forename: this.fb.nonNullable.control(''),
        middlenames: this.fb.nonNullable.control(''),
        lastname: this.fb.nonNullable.control(''),
        contactNumber: this.fb.nonNullable.control(''),
        alternateContactNumber: this.fb.nonNullable.control(''),
        email: this.fb.nonNullable.control(''),
        address: this.fb.nonNullable.group({
            id: this.fb.nonNullable.control(''),
            addresslineOne: this.fb.nonNullable.control(''),
            addresslineTwo: this.fb.nonNullable.control(''),
            postcode: this.fb.nonNullable.control(''),
        }),
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        if (this.user) {
            this.form.patchValue(this.user);
        }
        this.form.disable();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.user) {
            this.form.patchValue(this.user);
        }
    }
}
