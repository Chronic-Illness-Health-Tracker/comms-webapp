import { Component } from '@angular/core';
import { PatientDetailsCardComponent } from '../../../components/patient-details-card/patient-details-card.component';
import { FormsModule, NgModel } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { RegistrationControllerService } from '../../../../api';

@Component({
    selector: 'app-create-account',
    standalone: true,
    imports: [PatientDetailsCardComponent, FormsModule],
    providers: [RegistrationControllerService],
    templateUrl: './create-account.component.html',
    styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
    protected editMode: boolean = false;
    protected registrationCorrect = false;

    protected registrationCode: string = '';
    protected codeChecked: boolean = false;

    constructor(private registrationService: RegistrationControllerService) {}

    verifyCode() {
        if (this.registrationCode.length !== 12) {
            this.registrationCorrect = true;
        }

        lastValueFrom(
            this.registrationService.codeValid(this.registrationCode)
        ).then(validCode => {
            this.codeChecked = true;
            this.registrationCorrect = validCode;
        });
    }
}
