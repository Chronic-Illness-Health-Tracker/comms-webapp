import {
    Component,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { viewport } from '@popperjs/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

@Component({
    selector: 'app-charts',
    standalone: true,
    imports: [NgChartsModule],
    templateUrl: './charts.component.html',
    styleUrl: './charts.component.scss',
})
export class ChartsComponent implements OnInit, OnChanges {
    @Input({ required: true }) data!: Array<number>;

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

    private breakpointMd = +getComputedStyle(document.body)
        .getPropertyValue('--bs-breakpoint-md')
        .replace('px', '');

    private currentWidth: number;

    protected prefferedSmallChart!: ChartType;
    protected chartOneType: ChartType;
    protected chartOneOptions: ChartConfiguration['options'];
    protected chartData!: ChartData<ChartType, number[], string | string[]>;

    @ViewChildren(BaseChartDirective) charts?: QueryList<BaseChartDirective>;

    constructor() {
        this.currentWidth = window.innerWidth;
        this.prefferedSmallChart = 'pie';

        if (this.currentWidth < this.breakpointMd) {
            this.chartOneType = this.prefferedSmallChart;
            this.chartOneOptions = this.pieChartOptions;
        } else {
            this.chartOneType = 'pie';
            this.chartOneOptions = this.pieChartOptions;
        }
    }

    ngOnInit(): void {
        this.chartData = {
            labels: ['Normal', 'Sub-clinical', 'Unwell'],
            datasets: [
                {
                    data: this.data,
                    backgroundColor: [this.success, this.warning, this.danger],
                },
            ],
        };
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (this.chartData?.datasets) {
            this.chartData.datasets[0].data = this.data;
            this.charts?.forEach(chart => {
                chart?.update();
            });
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: { target: { innerWidth: number } }) {
        this.currentWidth = event.target.innerWidth;

        if (this.currentWidth >= this.breakpointMd) {
            this.chartOneType = 'pie';
            this.chartOneOptions = this.pieChartOptions;
        } else {
            this.chartOneType = this.prefferedSmallChart;
            if (this.prefferedSmallChart === 'pie') {
                this.chartOneOptions = this.pieChartOptions;
            } else {
                this.chartOneOptions = this.barChartOptions;
            }
        }
    }

    protected pieChartOptions: ChartConfiguration['options'] = {
        maintainAspectRatio: false,
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

    protected barChartOptions: ChartConfiguration['options'] = {
        scales: {
            x: {
                border: {
                    width: 1,
                    color: this.fontColour,
                },
                grid: {
                    display: false,
                },
            },
            y: {
                border: {
                    width: 1,
                    color: this.fontColour,
                },
                grid: {
                    display: false,
                },
            },
        },
        datasets: {
            bar: {
                barThickness: 50,
            },
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    toggleChart() {
        if (this.prefferedSmallChart === 'pie') {
            this.chartOneOptions = this.barChartOptions;
            this.prefferedSmallChart = 'bar';
            this.chartOneType = 'bar';
        } else {
            this.chartOneOptions = this.pieChartOptions;
            this.prefferedSmallChart = 'pie';
            this.chartOneType = 'pie';
        }
    }
}
