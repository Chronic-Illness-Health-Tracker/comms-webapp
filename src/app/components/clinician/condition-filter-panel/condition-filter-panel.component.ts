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
import { HealthCondition } from '../../../../api';

@Component({
    selector: 'app-condition-filter-panel',
    standalone: true,
    imports: [NgbDropdownModule, FormsModule, HelphiChipComponent],
    templateUrl: './condition-filter-panel.component.html',
    styleUrl: './condition-filter-panel.component.scss',
})
export class ConditionFilterPanelComponent implements OnInit, OnDestroy {
    private onDestroy$ = new Subject<boolean>();

    @Input({ required: true }) items!: Array<HealthCondition>;
    @Output() selectedItems = new EventEmitter<Array<string>>();

    protected _selectedItems: Array<HealthCondition> = [];

    protected selectedItemsNames: Array<string | undefined> = [];

    protected search: string = '';
    protected searchChangedSubject: Subject<string | undefined> = new Subject<
        string | undefined
    >();
    protected filteredItems: Array<HealthCondition> = [];

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
                this.search = value!;

                this.filteredItems = this.items.filter(item => {
                    if (item.shortName) {
                        if (
                            item.shortName
                                .toLowerCase()
                                .includes(this.search.toLowerCase())
                        ) {
                            return true;
                        }
                    }

                    return item
                        .name!.toLowerCase()
                        .includes(this.search.toLowerCase());
                });
            });
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }

    itemToggled(itemToggled: HealthCondition) {
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
