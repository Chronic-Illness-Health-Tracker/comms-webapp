import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelphiChipComponent } from '@helphi/helphi-common-ui';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
    selector: 'app-condition-filter-panel',
    standalone: true,
    imports: [NgbDropdownModule, FormsModule, HelphiChipComponent],
    templateUrl: './condition-filter-panel.component.html',
    styleUrl: './condition-filter-panel.component.scss',
})
export class ConditionFilterPanelComponent implements OnInit, OnDestroy {
    private onDestroy$ = new Subject<boolean>();

    @Input({ required: true }) items!: Array<{
        name: string;
        shortname?: string | null;
    }>;
    @Output() selectedItems = new EventEmitter<Array<string>>();

    protected _selectedItems: Array<{
        name: string;
        shortname?: string | null;
    }> = [];

    protected selectedItemsNames: Array<string> = [];

    protected search: string = '';
    protected searchChangedSubject: Subject<string> = new Subject<string>();
    protected filteredItems: Array<{
        name: string;
        shortname?: string | null;
    }> = [];

    ngOnInit(): void {
        this._selectedItems = [...this.items];
        this.filteredItems = [...this.items];

        this.selectedItemsNames = this._selectedItems.map(item => item.name);

        this.searchChangedSubject
            .pipe(
                debounceTime(200),
                distinctUntilChanged(),
                takeUntil(this.onDestroy$)
            )
            .subscribe(value => {
                this.search = value;

                this.filteredItems = this.items.filter(item => {
                    if (item.shortname) {
                        if (
                            item.shortname
                                .toLowerCase()
                                .includes(this.search.toLowerCase())
                        ) {
                            return true;
                        }
                    }

                    return item.name
                        .toLowerCase()
                        .includes(this.search.toLowerCase());
                });
            });
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }

    itemToggled(itemToggled: { name: string; shortname?: string | null }) {
        const index = this._selectedItems.indexOf(itemToggled);

        if (index === -1) {
            this._selectedItems.push(itemToggled);
        } else {
            this._selectedItems.splice(index, 1);
        }

        this.selectedItemsNames = this._selectedItems.map(item => item.name);
    }

    searchChanged(search: string) {
        this.searchChangedSubject.next(search);
    }
}
