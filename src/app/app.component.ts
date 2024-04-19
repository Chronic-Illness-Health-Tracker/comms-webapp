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
    UserControllerService,
    UserType,
} from '../api';
import { lastValueFrom } from 'rxjs';
import { UserService } from './svc/user.service';
import { LoadingComponent } from './components/loading/loading.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HelphiContainerComponent, LoadingComponent],
    providers: [HealthConditionControllerService, UserControllerService],
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
        private userService: UserService
    ) {}

    title = 'comms-webapp';

    sidebarConfig: SidebarConfig = {
        showAddDropdown: true,
        canAddPatients: true,
        canAddConditions: true,
        addPatientRoute: ['patient', 'new'],
        addConditionRoute: ['condition', 'new'],
    };

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

            if (this.router.url === '/') {
                this.redirectToUserHome();
            }
        } catch (error) {
            this.redirectToCreateAccount();
        }

        this.authenticated = true;

        const conditions = await lastValueFrom(
            this.healthConditionService.listHealthConditions()
        );

        this.sidebarContent = conditions.map(condition => {
            return {
                content: condition.name!,
                route: ['condition', condition.id!],
            };
        });
    }

    private redirectToCreateAccount() {
        this.router.navigate(['account', 'create']);
    }

    private redirectToUserHome() {
        const userType = this.userService.getUserType();
        if (userType === UserType.TypeEnum.CLINITIAN) {
            this.router.navigate(['clinician', 'dashboard']);
        } else if (userType === UserType.TypeEnum.PATIENT) {
            this.router.navigate(['patient', 'home']);
        }
    }
}
