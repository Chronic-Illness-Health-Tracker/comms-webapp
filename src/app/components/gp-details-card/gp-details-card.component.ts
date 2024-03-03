import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-gp-details-card',
    standalone: true,
    imports: [NgbDropdownModule],
    templateUrl: './gp-details-card.component.html',
    styleUrl: './gp-details-card.component.scss',
})
export class GpDetailsCardComponent {}
