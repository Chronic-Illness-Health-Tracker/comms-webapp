import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterOutlet } from '@angular/router';
import {
    HelphiSidebarComponent,
    UserSettingsMenuComponent,
} from '@helphi/helphi-common-ui';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartData, ChartOptions, Color } from 'chart.js';
import {
    NgChartsConfiguration,
    NgChartsModule,
    ThemeService,
} from 'ng2-charts';
import { ChartsComponent } from './charts/charts.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        MatButtonModule,
        MatDividerModule,
        HelphiSidebarComponent,
        UserSettingsMenuComponent,
        NgbDropdownModule,
        ChartsComponent,
    ],
    providers: [
        { provide: NgChartsConfiguration, useValue: { generateColors: false } },
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'comms-webapp';

    private success = getComputedStyle(document.body).getPropertyValue(
        '--bs-success'
    );

    private warning = getComputedStyle(document.body).getPropertyValue(
        '--bs-warning'
    );

    private danger = getComputedStyle(document.body).getPropertyValue(
        '--bs-danger'
    );

    private font = getComputedStyle(document.body).getPropertyValue(
        '--bs-body-font-family'
    );

    private fontColour = getComputedStyle(document.body).getPropertyValue(
        '--bs-body-color'
    );

    constructor(private themeService: ThemeService) {
        const overrides: ChartOptions = {};
    }

    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 20,
                    boxHeight: 20,
                    color: this.fontColour,
                    font: {
                        family: this.font,
                    },
                    textAlign: 'left',
                },
            },
        },
    };

    public pieChartData: ChartData<'pie', number[], string | string[]> = {
        labels: ['Normal', 'Sub-clinical', 'Unwell'],
        datasets: [
            {
                data: [300, 500, 100],
                backgroundColor: [this.success, this.warning, this.danger],
            },
        ],
    };
}
