import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
    HelphiAuthService,
    HelphiContainerComponent,
    SidebarConfig,
} from '@helphi/helphi-common-ui';

import { HeaderService } from './svc/header.service';
import {
    BaseUser,
    HealthCondition,
    HealthConditionControllerService,
    PatientControllerService,
    UserControllerService,
    UserType,
} from '../api';
import { lastValueFrom } from 'rxjs';
import { UserService } from './svc/user.service';
import { LoadingComponent } from './components/loading/loading.component';
import { HttpErrorResponse } from '@angular/common/http';
import { SidebarService } from './svc/sidebar.service';
import { ToasterComponent } from './components/toaster/toaster.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        HelphiContainerComponent,
        LoadingComponent,
        ToasterComponent,
    ],
    providers: [
        HealthConditionControllerService,
        UserControllerService,
        PatientControllerService,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    protected authenticated: boolean = false;

    constructor(
        protected headerService: HeaderService,
        private healthConditionService: HealthConditionControllerService,
        private authService: HelphiAuthService,
        private userController: UserControllerService,
        private router: Router,
        protected userService: UserService,
        protected sidebarService: SidebarService,
        private patientService: PatientControllerService
    ) {}

    sidebarContent: Array<{ content: string; route: Array<string> }> = [];

    async ngOnInit(): Promise<void> {
        await this.authService.authenticate();

        const userId = await this.authService.getId();

        try {
            const userPromise = lastValueFrom(
                this.userController.getUser(userId!)
            );
            const userTypePromise = lastValueFrom(
                this.userController.getUserType(userId!)
            );

            const results = await Promise.all([userPromise, userTypePromise]);

            this.userService.setUser(results[0]);
            this.userService.setUserType(results[1].type);

            this.setSidebarConfig(results[1].type);

            await this.getConditions();
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    //auth is already redirecting... slowly
                } else {
                    this.redirectToCreateAccount();
                }
            }
        }

        this.authenticated = true;
    }

    private redirectToCreateAccount() {
        this.router.navigate(['account', 'create']);
    }

    private setSidebarConfig(userType?: UserType.TypeEnum) {
        if (userType === UserType.TypeEnum.CLINITIAN) {
            const sidebarConfig = {
                hideSidebar: false,
                showAddDropdown: true,
                canAddPatients: true,
                canAddConditions: true,
                addPatientRoute: ['clinician', 'patient', 'new'],
                addConditionRoute: ['clinician', 'condition', 'new'],
            };

            this.sidebarService.sidebarConfig = sidebarConfig;
        } else if (userType === UserType.TypeEnum.PATIENT) {
            const sidebarConfig = {
                hideSidebar: false,
                showAddDropdown: false,
                canAddPatients: false,
                canAddConditions: false,
                addPatientRoute: ['clinician', 'patient', 'new'],
                addConditionRoute: ['clinician', 'condition', 'new'],
            };
            this.sidebarService.sidebarConfig = sidebarConfig;
        }
    }

    private async getConditions() {
        const userType = this.userService.getUserType();

        if (userType === UserType.TypeEnum.CLINITIAN) {
            const conditions = await lastValueFrom(
                this.healthConditionService.listHealthConditions()
            );
            this.sidebarContent = conditions.map(condition => {
                return {
                    content: condition.name!,
                    route: ['clinician', 'condition', condition.id!, 'edit'],
                };
            });

            this.sidebarService.sideBarContent = this.sidebarContent;
        } else if (userType === UserType.TypeEnum.PATIENT) {
            const userId = this.userService.getUser()?.id;
            const conditions = await lastValueFrom(
                this.patientService.getConditions(userId!)
            );
            this.sidebarContent = conditions.map(condition => {
                return {
                    content: condition.name!,
                    route: ['patient', 'condition', condition.id!],
                };
            });
            this.sidebarService.sideBarContent = this.sidebarContent;
        }
    }
}
