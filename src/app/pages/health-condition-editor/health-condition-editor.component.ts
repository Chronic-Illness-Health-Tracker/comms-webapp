import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddOrganisationCardComponent } from '../../components/add-organisation-card/add-organisation-card.component';
import {
    HealthCondition,
    HealthConditionControllerService,
    Organisation,
} from '../../../api';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { SaveBarComponent } from '../../components/save-bar/save-bar.component';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageComponent } from '../../base/page.component';
import { HeaderService } from '../../svc/header.service';

@Component({
    selector: 'app-health-condition-editor',
    standalone: true,
    imports: [
        AddOrganisationCardComponent,
        FormsModule,
        ReactiveFormsModule,
        SaveBarComponent,
    ],
    providers: [HealthConditionControllerService],
    templateUrl: './health-condition-editor.component.html',
    styleUrl: './health-condition-editor.component.scss',
})
export class HealthConditionEditorComponent
    implements PageComponent, OnInit, OnDestroy
{
    private onDestroy$ = new Subject<boolean>();
    private organisationValid: boolean = false;
    protected condition: HealthCondition = {};
    protected editMode: boolean = false;
    protected submitted: boolean = false;

    conditionForm: FormGroup = this.fb.nonNullable.group({
        name: this.fb.nonNullable.control<string>(''),
        shortName: this.fb.nonNullable.control<string>(''),
    });

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private healthConditionService: HealthConditionControllerService,
        private headerService: HeaderService
    ) {
        this.setHeader();
    }

    setHeader(): void {
        this.headerService.header = 'Condition';
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
            if (data['editing'] === true) {
                this.editMode = true;
                this.conditionForm.enable();
            }
        });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(true);
        this.onDestroy$.complete;
    }

    save() {
        this.submitted = true;

        this.readFormValues();
        if (this.isValid()) {
            if (this.editMode) {
            } else {
                this.createHealthCondition();
            }
        }
    }

    createHealthCondition() {
        lastValueFrom(
            this.healthConditionService.createCondition(this.condition)
        )
            .then(() => {})
            .catch();
    }

    updateOrganisation(organisation: Organisation) {
        this.condition.organisation = organisation;
    }

    isValid(): boolean {
        return this.condition.name &&
            this.condition.shortName &&
            this.organisationValid
            ? true
            : false;
    }

    isOrganisationValid(valid: boolean) {
        this.organisationValid = valid;
    }

    readFormValues() {
        this.condition.name = this.conditionForm.value.name;
        this.condition.shortName = this.conditionForm.value.shortName;
    }
}
