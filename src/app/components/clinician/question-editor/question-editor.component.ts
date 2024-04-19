import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {
    FormGroup,
    Validators,
    FormArray,
    FormBuilder,
    ReactiveFormsModule,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Question } from '../../../../api';

@Component({
    selector: 'app-question-editor',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './question-editor.component.html',
    styleUrl: './question-editor.component.scss',
})
export class QuestionEditorComponent implements OnInit, OnDestroy {
    private onDestroy$ = new Subject<boolean>();

    @Input() question?: Question;
    @Output() questionChanged = new EventEmitter<Question>();
    @Output() questionTextChanged = new EventEmitter<string>();

    protected form: FormGroup = this.fb.nonNullable.group({
        questionId: this.fb.nonNullable.control<number>(0),
        conditionId: this.fb.nonNullable.control<string>(''),
        questionText: this.fb.nonNullable.control<string>(
            '',
            Validators.required
        ),
        questionType: this.fb.nonNullable.control<Question.QuestionTypeEnum>(
            Question.QuestionTypeEnum.Closed,
            Validators.required
        ),
        possibleAnswers: this.fb.nonNullable.array([]),
        answerScoreRange: this.fb.array([0, 0]),
    });

    get answers(): FormArray {
        return this.form.get('possibleAnswers') as FormArray;
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        if (this.question) {
            this.form.patchValue(this.question);

            const scoreRange = this.form.get('answerScoreRange') as FormArray;

            if (!scoreRange || scoreRange.length === 0) {
                scoreRange.push(0);
                scoreRange.push(0);
            }
        }

        this.form.valueChanges.pipe().subscribe(value => {
            this.questionTextChanged.emit(this.form.get('questionText')?.value);
            if (this.form.valid) {
                const question: Question = this.form.value;
                this.questionChanged.emit(question);
            }
        });
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }

    addNewAnswer() {
        const form = this.fb.nonNullable.group({
            answerText: this.fb.nonNullable.control<string>(
                '',
                Validators.required
            ),
            answerScore: this.fb.nonNullable.control<number>(
                0,
                Validators.required
            ),
        });
        const answers = this.form.get('possibleAnswers') as FormArray;
        answers.push(form);
    }

    removeAnswer(index: number) {
        const answers = this.form.get('possibleAnswers') as FormArray;
        answers.removeAt(index);
    }
}
