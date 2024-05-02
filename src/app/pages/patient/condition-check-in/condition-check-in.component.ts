import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionStepperComponent } from '../../../components/patient/question-stepper/question-stepper.component';
import {
    HealthConditionControllerService,
    PatientControllerService,
    Question,
} from '../../../../api';
import { UserService } from '../../../svc/user.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { PageComponent } from '../../../base/page.component';
import { HeaderService } from '../../../svc/header.service';
import { HelphiAuthService } from '@helphi/helphi-common-ui';

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
    protected answeredToday: boolean = false;

    constructor(
        private conditionService: HealthConditionControllerService,
        private patientService: PatientControllerService,
        private route: ActivatedRoute,
        protected userService: UserService,
        private headerService: HeaderService,
        private authService: HelphiAuthService
    ) {
        this.setHeader();
    }

    setHeader(): void {
        this.headerService.header = 'Check in';
    }

    ngOnInit(): void {
        this.route.params
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(async params => {
                if (params['conditionId']) {
                    this.conditionId = params['conditionId'];
                    this.patientId = this.userService.getUser()!.id!;

                    lastValueFrom(
                        this.patientService.getRecentStatus(
                            this.patientId,
                            this.conditionId
                        )
                    ).then(result => {
                        const todaysDate = new Date();
                        if (
                            result.timestamp!.setHours(0, 0, 0, 0) ==
                            todaysDate.setHours(0, 0, 0, 0)
                        ) {
                            this.answeredToday = true;
                        }
                    });
                    lastValueFrom(
                        this.conditionService.getHealthConditionQuestions(
                            this.conditionId
                        )
                    ).then(result => {
                        this.questions = result;
                    });
                }
            });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(true);
        this.onDestroy$.complete;
    }
}
