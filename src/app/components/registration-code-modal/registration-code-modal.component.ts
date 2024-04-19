import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-registration-code-modal',
    standalone: true,
    imports: [],
    templateUrl: './registration-code-modal.component.html',
    styleUrl: './registration-code-modal.component.scss',
})
export class RegistrationCodeModalComponent {
    @Input() registrationCode!: string;

    constructor(protected activeModal: NgbActiveModal) {}
}
