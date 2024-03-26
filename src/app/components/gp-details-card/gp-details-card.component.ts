import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {
    Gp,
    GpControllerService,
    GpSurgery,
    GpSurgeryControllerService,
} from '../../../api';
import {
    Subject,
    debounceTime,
    distinctUntilChanged,
    lastValueFrom,
    takeUntil,
} from 'rxjs';
import { NgClass } from '@angular/common';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';

@Component({
    selector: 'app-gp-details-card',
    standalone: true,
    imports: [NgbDropdownModule, FormsModule, NgClass, SelectDropdownComponent],
    providers: [GpSurgeryControllerService, GpControllerService],
    templateUrl: './gp-details-card.component.html',
    styleUrl: './gp-details-card.component.scss',
})
export class GpDetailsCardComponent implements OnInit, OnDestroy, OnChanges {
    private onDestroy$ = new Subject<boolean>();

    protected disableGP: boolean = false;

    protected gpSurgeries: Array<GpSurgery> = [];
    protected gps: Array<Gp> = [];

    protected selectedGpSurgery?: GpSurgery | null;
    protected selectedGp?: Gp | null;

    protected gpName(gp?: Gp | null): string {
        const name: string = '';
        if (gp) {
            const title = gp.title ? gp.title : '';
            const forename = gp.forename ? gp.forename : '';
            const lastname = gp.lastname ? gp.lastname : '';

            return `${title} ${forename} ${lastname}`;
        } else {
            return '';
        }
    }

    protected gpSurgeryName(gpSurgery?: GpSurgery): string {
        return gpSurgery?.name ? gpSurgery.name : '';
    }

    protected get surgeryAddress(): string {
        if (this.selectedGp) {
            if (this.selectedGp.surgery?.address?.addresslineTwo) {
                return `${this.selectedGp.surgery?.address?.addresslineOne}, ${this.selectedGp.surgery?.address?.addresslineTwo}, ${this.selectedGp.surgery?.address?.postcode}`;
            } else {
                return `${this.selectedGp.surgery?.address?.addresslineOne}, ${this.selectedGp.surgery?.address?.postcode}`;
            }
        } else {
            return '';
        }
    }

    @Input() gp?: Gp;
    @Input() submitted: boolean = false;
    @Input() editable?: boolean = false;
    @Output() change = new EventEmitter<Gp | null>();
    @Output() valid = new EventEmitter<boolean>();

    constructor(
        private fb: FormBuilder,
        protected gpSurgeryService: GpSurgeryControllerService,
        private gpService: GpControllerService
    ) {}

    ngOnInit(): void {
        this.searchForGpSurgery('');

        if (this.gp) {
            this.selectedGp = this.gp;
            this.selectedGpSurgery = this.gp.surgery;
            this.valid.emit(true);
        } else {
            this.valid.emit(false);
        }

        if (this.selectedGpSurgery) {
            this.disableGP = false;
        } else {
            this.disableGP = true;
        }
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(true);
        this.onDestroy$.complete;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.selectedGp && !this.selectedGpSurgery) {
            if (this.gp) {
                this.selectedGp = this.gp;
                this.selectedGpSurgery = this.gp.surgery;
            }
        }
    }

    setGpSurgery(gpSurgery: unknown) {
        this.selectedGpSurgery = gpSurgery as GpSurgery;
        if (!gpSurgery) {
            this.disableGP = true;
        } else {
            this.disableGP = false;
            this.getGps((gpSurgery as GpSurgery)?.id);
        }

        this.setGp(null);
    }

    setGp(gp: unknown | null) {
        this.selectedGp = gp as Gp | null;
        this.change.emit(gp as Gp | null);
        if (gp && gp !== null) {
            this.valid.emit(true);
        } else {
            this.valid.emit(false);
        }
    }

    searchForGpSurgery(surgeryName: string) {
        lastValueFrom(this.gpSurgeryService.listGpSurgeries(surgeryName))
            .then(result => {
                this.gpSurgeries = result;
            })
            .catch();
    }

    getGps(surgeryId?: string) {
        if (surgeryId) {
            lastValueFrom(this.gpService.getAllGpInSurgery(surgeryId))
                .then(result => {
                    this.gps = result;
                })
                .catch();
        }
    }
}
