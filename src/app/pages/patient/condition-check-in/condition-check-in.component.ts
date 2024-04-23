import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionStepperComponent } from '../../../components/patient/question-stepper/question-stepper.component';
import { HealthConditionControllerService, Question } from '../../../../api';
import { UserService } from '../../../svc/user.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { PageComponent } from '../../../base/page.component';
import { HeaderService } from '../../../svc/header.service';

@Component({
    selector: 'app-condition-check-in',
    standalone: true,
    imports: [QuestionStepperComponent],
    templateUrl: './condition-check-in.component.html',
    styleUrl: './condition-check-in.component.scss',
})
export class ConditionCheckInComponent
    implements OnInit, OnDestroy, PageComponent
{
    private onDestroy$ = new Subject<boolean>();
    private conditionId!: string;
    protected patientId!: string;

    protected questions?: Array<Question>;

    constructor(
        private conditionService: HealthConditionControllerService,
        private route: ActivatedRoute,
        protected userService: UserService,
        private headerService: HeaderService
    ) {
        this.setHeader();
    }

    setHeader(): void {
        this.headerService.header = 'Check in';
    }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
            if (params['conditionId']) {
                this.conditionId = params['conditionId'];
                lastValueFrom(
                    this.conditionService.getHealthConditionQuestions(
                        this.conditionId
                    )
                ).then(result => {
                    this.questions = result;
                });
            }
        });

        this.patientId = this.userService.getUser()!.id!;
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(true);
        this.onDestroy$.complete;
    }
}
