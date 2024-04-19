import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { OrganisationControllerService, Organisation } from '../../../../api';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';

@Component({
    selector: 'app-add-organisation-card',
    standalone: true,
    imports: [SelectDropdownComponent, FormsModule, ReactiveFormsModule],
    providers: [OrganisationControllerService],
    templateUrl: './add-organisation-card.component.html',
    styleUrl: './add-organisation-card.component.scss',
})
export class AddOrganisationCardComponent
    implements OnInit, OnDestroy, OnChanges
{
    private onDestroy$ = new Subject<boolean>();

    protected editable: boolean = true;
    protected organisations: Array<Organisation> = [];
    protected selectedOrganisation?: Organisation;

    protected form: FormGroup = this.fb.nonNullable.group({
        id: this.fb.nonNullable.control(''),
        name: this.fb.nonNullable.control<string>('', Validators.required),
        countryCode: this.fb.nonNullable.control<string>(
            '',
            Validators.required
        ),
        email: this.fb.nonNullable.control<string>('', Validators.required),
        contactNumber: this.fb.nonNullable.control<string>(
            '',
            Validators.required
        ),
        contactAddress: this.fb.nonNullable.group({
            id: this.fb.nonNullable.control(''),
            addresslineOne: this.fb.nonNullable.control<string>(
                '',
                Validators.required
            ),
            addresslineTwo: this.fb.nonNullable.control<string>(
                '',
                Validators.required
            ),
            postcode: this.fb.nonNullable.control<string>(
                '',
                Validators.required
            ),
        }),
    });

    @Input() inputOrganisation?: Organisation;

    @Input() submitted: boolean = false;
    @Output() itemChanged = new EventEmitter<Organisation>();
    @Output() valid = new EventEmitter<boolean>();

    constructor(
        private organisationService: OrganisationControllerService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.loadOrganisations('');
        this.form.disable();

        this.form.valueChanges
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(() => {
                const organisation: Organisation = this.form.getRawValue();
                this.itemChanged.emit(organisation);
            });
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.inputOrganisation) {
            this.setOrganisation(this.inputOrganisation);
        }
    }

    protected organisationName(organisation?: Organisation): string {
        return organisation?.name ? organisation.name : '';
    }

    protected loadOrganisations(organisationName: string) {
        lastValueFrom(
            this.organisationService.listOrganisations(organisationName)
        )
            .then(result => {
                this.organisations = result;
            })
            .catch();
    }

    protected setOrganisation(organisation: unknown) {
        this.selectedOrganisation = organisation as Organisation;
        this.form.patchValue(this.selectedOrganisation);

        this.valid.emit(true);
    }

    protected searchForOrganisation(organisationName: string) {
        lastValueFrom(
            this.organisationService.listOrganisations(organisationName)
        )
            .then(result => {
                this.organisations = result;
            })
            .catch();
    }
}
