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

@Component({
    selector: 'app-gp-details-card',
    standalone: true,
    imports: [NgbDropdownModule, FormsModule, NgClass],
    providers: [GpSurgeryControllerService, GpControllerService],
    templateUrl: './gp-details-card.component.html',
    styleUrl: './gp-details-card.component.scss',
})
export class GpDetailsCardComponent implements OnInit, OnDestroy, OnChanges {
    private onDestroy$ = new Subject<boolean>();

    protected gpSurgerySearch = '';
    protected gpSurgerySearchChangedSubject: Subject<string> =
        new Subject<string>();

    protected disableGP: boolean = false;

    protected gpSurgeries?: Array<GpSurgery> = [
        { name: 'HEALY HEALY WOO WOO' },
        { name: 'nOT SO HEALY HEALY WOO WOO' },
    ];
    protected gps?: Array<Gp>;

    protected selectedGpSurgery?: GpSurgery | null;
    protected selectedGp?: Gp | null;

    protected form: FormGroup = this.fb.nonNullable.group({
        forename: this.fb.nonNullable.control(''),
        email: this.fb.nonNullable.control(''),
        surgery: this.fb.nonNullable.group({
            name: this.fb.nonNullable.control(''),
            email: this.fb.nonNullable.control(''),
            address: this.fb.nonNullable.group({}),
        }),
    });

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
        private gpSurgeryService: GpSurgeryControllerService,
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

        this.gpSurgerySearchChangedSubject
            .pipe(
                debounceTime(200),
                distinctUntilChanged(),
                takeUntil(this.onDestroy$)
            )
            .subscribe(value => {
                this.searchForGpSurgery(value);
            });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(true);
        this.onDestroy$.complete;
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('gp changes');
        console.log('selectedGP', this.selectedGp);
        console.log('selectedGPsur', this.selectedGpSurgery);
        console.log('gp', this.gp);
        if (!this.selectedGp && !this.selectedGpSurgery) {
            if (this.gp) {
                console.log('SETTING NEW GP');
                this.selectedGp = this.gp;
                this.selectedGpSurgery = this.gp.surgery;
            }
        }
    }

    setGpSurgery(gpSurgery: GpSurgery | null) {
        this.selectedGpSurgery = gpSurgery;
        if (!gpSurgery) {
            this.disableGP = true;
        } else {
            this.disableGP = false;
            this.getGps(gpSurgery?.id);
        }

        this.setGp(null);
    }

    setGp(gp: Gp | null) {
        this.selectedGp = gp;
        this.change.emit(gp);
        if (gp && gp !== null) {
            this.valid.emit(true);
        } else {
            this.valid.emit(false);
        }
    }

    onGpSurgerySearch(name: string) {
        this.gpSurgerySearchChangedSubject.next(name);
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
