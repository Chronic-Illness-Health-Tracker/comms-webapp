import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../base/page.component';
import { HeaderService } from '../svc/header.service';
import { ChartsComponent } from '../charts/charts.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [ChartsComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements PageComponent {
    constructor(private headerService: HeaderService) {
        this.setHeader();
    }

    setHeader(): void {
        this.headerService.header = 'dashboard';
    }
}
