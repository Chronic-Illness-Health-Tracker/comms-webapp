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
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ConditionCheckIn, Question } from '../../../../api';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionEditorComponent } from '../question-editor/question-editor.component';

@Component({
    selector: 'app-check-in-editor',
    standalone: true,
    imports: [
        NgbAccordionModule,
        NgbModule,
        QuestionEditorComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './check-in-editor.component.html',
    styleUrl: './check-in-editor.component.scss',
})
export class CheckInEditorComponent implements OnInit, OnDestroy, OnChanges {
    private onDestroy$ = new Subject<boolean>();

    @Input() questions: Array<Question> = [];
    @Input() conditionCheckIn?: ConditionCheckIn;
    @Output() questionsChanged = new EventEmitter<Array<Question>>();
    @Output() checkInChanged = new EventEmitter<ConditionCheckIn>();

    private formSet: boolean = false;

    protected form = this.fb.nonNullable.group({
        conditionId: this.fb.nonNullable.control<string>(
            '',
            Validators.required
        ),
        subclinicalScore: this.fb.nonNullable.control<number>(
            0,
            Validators.required
        ),
        unwellScore: this.fb.nonNullable.control<number>(
            0,
            Validators.required
        ),
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        if (this.conditionCheckIn) {
            this.patchCheckIn();
        }

        this.form.valueChanges.pipe().subscribe(() => {
            if (this.form.valid) {
                this.checkInChanged.emit(this.form.value);
            }
        });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(true);
        this.onDestroy$.complete;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.conditionCheckIn) {
            this.patchCheckIn();
        }
    }

    addNewQuestion() {
        this.questions.push({});
    }

    onQuestionChanged(question: Question, index: number) {
        this.questions[index] = question;
        this.questionsChanged.emit(this.questions);
    }

    patchCheckIn() {
        if (!this.formSet) {
            this.form.patchValue(this.conditionCheckIn!);
            this.formSet = true;
        }
    }
}
