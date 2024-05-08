import { Component, OnInit } from '@angular/core';
import { UserService } from '../../svc/user.service';
import { UserType } from '../../../api';
import { Router } from '@angular/router';
import { SidebarService } from '../../svc/sidebar.service';

@Component({
    selector: 'app-alternate-redirect',
    standalone: true,
    imports: [],
    templateUrl: './alternate-redirect.component.html',
    styleUrl: './alternate-redirect.component.scss',
})
export class AlternateRedirectComponent implements OnInit {
    constructor(
        private userService: UserService,
        private router: Router,
        private sidebarService: SidebarService
    ) {}

    ngOnInit(): void {
        this.redirectToUserHome();
    }

    private redirectToUserHome() {
        const userType = this.userService.getUserType();
        if (userType === UserType.TypeEnum.CLINITIAN) {
            this.router.navigate(['clinician', 'dashboard']);
        } else if (userType === UserType.TypeEnum.PATIENT) {
            const sidebarContent = this.sidebarService.sideBarContent;
            this.router.navigate(sidebarContent[0].route);
        }
    }
}
