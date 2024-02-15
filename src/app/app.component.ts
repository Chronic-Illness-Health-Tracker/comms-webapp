import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterOutlet } from '@angular/router';
import {
    HelphiContainerComponent,
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
import { HeaderService } from './svc/header.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HelphiContainerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    constructor(protected headerService: HeaderService) {}
    title = 'comms-webapp';

    sidebarContent = [
        'Hypertrophic Cardiomyopathy (HCM)',
        'Heart Failure',
        'Arrhythmia',
        'Short QT Syndrome (SQTS)',
        'Catecholaminergic Polymorphic Ventricular Tachycardia (CPVT)',
        'Brugada syndrome',
        'Acyanotic heart disease',
    ];
}
