import { Component, OnInit } from '@angular/core';
import { PatientDetailsCardComponent } from '../../../components/clinician/patient-details-card/patient-details-card.component';
import { FormsModule, NgModel } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { BaseUser, RegistrationControllerService } from '../../../../api';
import { PageComponent } from '../../../base/page.component';
import { HeaderService } from '../../../svc/header.service';
import { HelphiAuthService } from '@helphi/helphi-common-ui';
import { Router } from '@angular/router';
import { SidebarService } from '../../../svc/sidebar.service';
import { BaseUserViewerComponent } from '../../../components/clinician/base-user-viewer/base-user-viewer.component';

@Component({
    selector: 'app-create-account',
    standalone: true,
    imports: [BaseUserViewerComponent, FormsModule],
    providers: [RegistrationControllerService],
    templateUrl: './create-account.component.html',
    styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent implements PageComponent, OnInit {
    protected registrationCorrect = false;

    protected registrationCode: string = '';
    protected codeChecked: boolean = false;

    protected baseUser?: BaseUser;

    constructor(
        private registrationService: RegistrationControllerService,
        private header: HeaderService,
        private authSerive: HelphiAuthService,
        private router: Router,
        private sidebarService: SidebarService
    ) {
        this.setHeader();
    }
    ngOnInit(): void {
        const sidebarConfig = {
            hideSidebar: true,
            showAddDropdown: false,
            canAddPatients: false,
            canAddConditions: false,
            addPatientRoute: ['clinician', 'patient', 'new'],
            addConditionRoute: ['clinician', 'condition', 'new'],
        };
        this.sidebarService.sidebarConfig = sidebarConfig;
    }

    setHeader(): void {
        this.header.header = 'Create account';
    }

    verifyCode() {
        if (this.registrationCode.length !== 12) {
            this.registrationCorrect = false;
            return;
        }

        lastValueFrom(
            this.registrationService.submitCode(this.registrationCode)
        )
            .then(baseUser => {
                this.registrationCorrect = true;
                this.baseUser = baseUser;
            })
            .catch(() => {
                this.registrationCorrect = false;
            })
            .finally(() => {
                this.codeChecked = true;
            });
    }

    registerAccount() {
        this.authSerive.getId().then(id => {
            lastValueFrom(
                this.registrationService.registerUser(
                    this.registrationCode,
                    id!
                )
            ).then(() => {
                this.router.navigate(['']);
            });
        });
    }
}
