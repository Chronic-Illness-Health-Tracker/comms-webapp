import { Component, Input, OnInit } from '@angular/core';
import {
    PatientControllerService,
    Question,
    UserResponse,
} from '../../../../api';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '@auth0/auth0-angular';
import { forkJoin, lastValueFrom } from 'rxjs';
import { Severity, ToastService } from '../../../svc/toast.service';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-question-stepper',
    standalone: true,
    imports: [],
    templateUrl: './question-stepper.component.html',
    styleUrl: './question-stepper.component.scss',
})
export class QuestionStepperComponent implements OnInit {
    @Input({ required: true }) questions!: Array<Question>;
    @Input({ required: true }) userId!: string;

    private userResponses: Array<UserResponse> = [];

    protected step: number = 0;
    protected currentQuestion!: Question;

    protected form: FormArray = this.fb.nonNullable.array([]);

    constructor(
        private fb: FormBuilder,
        private patientService: PatientControllerService,
        private toaster: ToastService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.currentQuestion = this.questions[0];
        this.buildForm();
    }

    buildForm() {
        this.questions.forEach(question => {
            const answerGroups: Array<FormGroup> = [];
            question.possibleAnswers?.forEach(answer => {
                answerGroups.push(
                    this.fb.nonNullable.group({
                        text: this.fb.nonNullable.control(answer.answerText),
                        score: this.fb.nonNullable.control(answer.answerScore),
                        checked: this.fb.nonNullable.control(false),
                    })
                );
            });

            const questionGroup = this.fb.nonNullable.group({
                questions: this.fb.nonNullable.array(answerGroups),
            });

            this.form.push(questionGroup);
        });
    }

    onCheckChanged(event: any) {
        const answerText = event.target.value;

        const group: FormGroup = this.form.controls[this.step] as FormGroup;
        const questions: FormArray = group.get(
            'questions'
        ) as FormArray<FormGroup>;

        questions.controls.forEach((group: any) => {
            const controlText = group.get('text').value;

            if (controlText === answerText) {
                const check: FormControl = group.get('checked');
                check.setValue(event.target.checked);
            }
        });
    }

    isChecked(index: number) {
        const group: FormGroup = this.form.controls[this.step] as FormGroup;
        const questions: FormArray = group.get(
            'questions'
        ) as FormArray<FormGroup>;

        return questions.controls[index].get('checked')?.value;
    }

    createResponse() {
        let response: UserResponse | undefined = this.userResponses.at(
            this.step
        );

        if (response === null) {
            response = {
                responseId: 0,
                questionId: this.questions[this.step].questionId,
                conditionId: this.questions[this.step].conditionId,
                userId: this.userId,
                answer: undefined,
                timestamp: new Date(),
            };
        }
    }

    previousQuestion() {
        this.step--;
        this.currentQuestion = this.questions[this.step];
    }

    nextQuestion() {
        this.step++;
        this.currentQuestion = this.questions[this.step];
    }

    finishQuestions() {
        this.form.value.forEach((question: any, index: number) => {
            const userRespose: UserResponse = {
                responseId: 0,
                questionId: this.questions[index].questionId,
                conditionId: this.questions[index].conditionId,
                userId: this.userId,
                answer: [],
                timestamp: new Date(),
            };

            question.questions.forEach((answer: any) => {
                if (answer.checked === true) {
                    userRespose.answer?.push({
                        answerText: answer.text,
                        answerScore: answer.score,
                    });
                }
            });

            this.userResponses.push(userRespose);
        });

        this.sendQuestions();
    }

    sendQuestions() {
        const promises: Array<Promise<UserResponse>> = [];
        this.userResponses.forEach(resonse => {
            const promise = lastValueFrom(
                this.patientService.addAnswer(resonse)
            );
            promises.push(promise);
        });

        lastValueFrom(forkJoin(promises)).then(() => {
            this.toaster.show('questions sent!', Severity.success, 5000);
            this.router.navigate(['patient', 'home']);
        });
    }
}
