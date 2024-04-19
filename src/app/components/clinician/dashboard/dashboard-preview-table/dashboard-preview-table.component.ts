import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dashboard-preview-table',
    standalone: true,
    imports: [NgClass],
    templateUrl: './dashboard-preview-table.component.html',
    styleUrl: './dashboard-preview-table.component.scss',
})
export class DashboardPreviewTableComponent {
    @Input({ required: true }) data!: Array<any>;

    protected sortedBy: string = '';
    protected sortedDirection: string = 'asc';

    onSort(columnName: string) {
        if (this.sortedBy === columnName) {
            this.sortedDirection =
                this.sortedDirection === 'asc' ? 'desc' : 'asc';
        }

        this.sortedBy = columnName;
        this.sort(columnName);
    }

    private sort(sortType: string) {
        switch (sortType) {
            case 'name':
                this.data.sort(this.sortByName);
                break;
            case 'nhsNumber':
                this.data.sort(this.sortByNhsNumber);
                break;
            case 'conditionName':
                this.data.sort(this.sortByConditionName);
                break;
            case 'conditionStatus':
                this.data.sort(this.sortByConditionStatus);
                break;
        }

        if (this.sortedDirection === 'desc') {
            this.data.reverse();
        }
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
