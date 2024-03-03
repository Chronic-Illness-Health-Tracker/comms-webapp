import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
    private onDestroy$ = new Subject<boolean>();

    protected search: string = '';
    protected searchChangedSubject: Subject<string> = new Subject<string>();

    @Output() output = new EventEmitter<string>();

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }

    ngOnInit(): void {
        this.searchChangedSubject
            .pipe(
                debounceTime(200),
                distinctUntilChanged(),
                takeUntil(this.onDestroy$)
            )
            .subscribe(value => {
                this.output.emit(value);
            });
    }

    searchChanged(search: string) {
        this.searchChangedSubject.next(search);
    }
}
