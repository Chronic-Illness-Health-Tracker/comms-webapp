import { NgClass } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-select-dropdown',
    standalone: true,
    imports: [NgbDropdownModule, FormsModule, NgClass],
    templateUrl: './select-dropdown.component.html',
    styleUrl: './select-dropdown.component.scss',
})
export class SelectDropdownComponent implements OnInit, OnDestroy {
    private onDestroy$ = new Subject<boolean>();

    @Input() submitted: boolean = false;
    @Input() editable?: boolean = true;
    @Input() messageSingle: string = '';
    @Input() messagePlural: string = '';
    @Input() items: Array<unknown> = [];
    @Input({ required: true }) nameFn!: Function;
    @Input() searchable?: boolean = true;

    @Output() selectedItem = new EventEmitter<unknown>();
    @Output() searchOutput = new EventEmitter<string>();

    protected itemSearch = '';
    protected _selectedItem?: unknown | null;
    protected itemSearchChangedSubject: Subject<string> = new Subject<string>();

    protected get searchFor(): string {
        return `Search for ${this.messageSingle}...`;
    }

    constructor() {}

    ngOnInit(): void {
        this.itemSearchChangedSubject
            .pipe(
                debounceTime(200),
                distinctUntilChanged(),
                takeUntil(this.onDestroy$)
            )
            .subscribe(value => {
                this.searchOutput.emit(value);
            });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(true);
        this.onDestroy$.complete;
    }

    onItemSearch(name: string) {
        this.itemSearchChangedSubject.next(name);
    }

    setItem(item: any | null) {
        this._selectedItem = item;
        this.selectedItem.emit(item);
    }
}
