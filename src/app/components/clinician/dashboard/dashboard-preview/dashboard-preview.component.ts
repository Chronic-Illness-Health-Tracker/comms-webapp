import { NgClass } from '@angular/common';
import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { PreviewCardComponent } from '../preview-card/preview-card.component';
import { FormsModule } from '@angular/forms';
import { DashboardPreviewTableComponent } from '../dashboard-preview-table/dashboard-preview-table.component';
import { Router } from '@angular/router';
import { SearchComponent } from '../../search/search.component';

@Component({
    selector: 'app-dashboard-preview',
    standalone: true,
    imports: [
        NgClass,
        SearchComponent,
        PreviewCardComponent,
        FormsModule,
        DashboardPreviewTableComponent,
    ],
    templateUrl: './dashboard-preview.component.html',
    styleUrl: './dashboard-preview.component.scss',
})
export class DashboardPreviewComponent implements OnInit, OnChanges {
    private _data: Array<any> = [];
    private sortType: string = '';

    @Input({ required: true }) data!: Array<any>;
    @Input() extended!: boolean;

    protected filteredData: Array<any> = [];

    protected sortedBy: string = '';
    protected sortedDirection: string = 'asc';

    protected selectedMobileFilter: string = '';

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.filteredData = this.data;
        this._data = this.data;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (JSON.stringify(this._data) !== JSON.stringify(this.data)) {
            this._data = this.data;
            this.filteredData = this._data;
            this.sort(this.sortType);
        }
    }

    private sort(sortType: string) {
        this.sortType = sortType;
        switch (sortType) {
            case 'name':
                this.filteredData.sort(this.sortByName);
                break;
            case 'nhsNumber':
                this.filteredData.sort(this.sortByNhsNumber);
                break;
            case 'conditionName':
                this.filteredData.sort(this.sortByConditionName);
                break;
            case 'conditionStatus':
                this.filteredData.sort(this.sortByConditionStatus);
                break;
        }

        if (this.sortedDirection === 'desc') {
            this.filteredData.reverse();
        }
    }

    searchOutput(search: string) {
        this.filteredData = this.data.filter(value => {
            return (
                value.name.toLowerCase().includes(search.toLowerCase()) ||
                value.nhsNumber.toLowerCase().includes(search.toLowerCase()) ||
                value.conditionName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                value.conditionStatus
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        });
    }

    mobileFilterChanged(filter: string) {
        const filterParams = filter.split('-');

        this.sortedDirection = filterParams[1];

        this.sortedBy = filterParams[0];
        this.sort(filterParams[0]);
    }

    viewAll() {
        this.router.navigate(['clinician', 'dashboard'], {
            queryParams: { extended: true },
        });
    }

    private sortByName = (x: any, y: any): number => {
        return x.name.localeCompare(y.name);
    };

    private sortByNhsNumber = (x: any, y: any): number => {
        return x.nhsNumber.localeCompare(y.nhsNumber);
    };

    private sortByConditionName = (x: any, y: any): number => {
        return x.conditionName.localeCompare(y.conditionName);
    };

    private sortByConditionStatus = (x: any, y: any): number => {
        if (x.conditionStatus === y.conditionStatus) {
            return 0;
        }
        return x.conditionStatus > y.conditionStatus ? 1 : -1;
    };
}
