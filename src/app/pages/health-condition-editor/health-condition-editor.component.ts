import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddOrganisationCardComponent } from '../../components/add-organisation-card/add-organisation-card.component';
import {
    ConditionCheckIn,
    HealthCondition,
    HealthConditionControllerService,
    Organisation,
    Question,
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
import { CheckInEditorComponent } from '../../components/check-in-editor/check-in-editor.component';

@Component({
    selector: 'app-health-condition-editor',
    standalone: true,
    imports: [
        AddOrganisationCardComponent,
        FormsModule,
        ReactiveFormsModule,
        SaveBarComponent,
        CheckInEditorComponent,
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
    protected conditionCheckIn?: ConditionCheckIn;

    protected conditionId?: string;

    protected organisation?: Organisation;

    protected questions: Array<Question> = [];

    conditionForm: FormGroup = this.fb.nonNullable.group({
        id: this.fb.nonNullable.control<string>(''),
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

        this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
            if (params['conditionId']) {
                this.conditionId = params['conditionId'];
                this.loadCondition();
                this.loadCheckIn();
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
                this.updateHealthCondition();
            } else {
                this.createHealthCondition();
            }
        }
        if (this.editMode) {
            this.saveQuestions();
        }
    }

    createHealthCondition() {
        lastValueFrom(
            this.healthConditionService.createCondition(this.condition)
        )
            .then(() => {})
            .catch();

        //lastValueFrom(this.healthConditionService.);
    }

    updateHealthCondition() {
        lastValueFrom(
            this.healthConditionService.updateCondition(this.condition)
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
        this.condition.id =
            this.condition.id === undefined ? '' : this.condition.id;
        this.condition.name = this.conditionForm.value.name;
        this.condition.shortName = this.conditionForm.value.shortName;
    }

    loadCondition() {
        lastValueFrom(
            this.healthConditionService.getCondition(this.conditionId!)
        ).then(result => {
            this.condition = result;
            this.organisation = result.organisation;

            this.patchForm();
        });
    }

    loadCheckIn() {
        lastValueFrom(this.healthConditionService.getCheckIn(this.conditionId!))
            .then(result => {
                this.conditionCheckIn = result;
            })
            .catch(() => {});
    }

    patchForm() {
        this.conditionForm.controls['name'].setValue(this.condition.name);
        this.conditionForm.controls['shortName'].setValue(
            this.condition.shortName
        );
    }

    onQuestionChanged(questions: Array<Question>) {
        this.questions = questions;
    }

    onCheckInChanged(checkIn: ConditionCheckIn) {
        this.conditionCheckIn = checkIn;
    }

    saveQuestions() {
        lastValueFrom(
            this.healthConditionService.updateQuestions(
                this.questions,
                this.conditionId as string
            )
        ).then();
    }
}
