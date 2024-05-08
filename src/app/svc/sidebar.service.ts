import { Injectable } from '@angular/core';
import { SidebarConfig } from '@helphi/helphi-common-ui';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    //default config
    private _sidebarConfig: SidebarConfig = {
        hideSidebar: false,
        showAddDropdown: true,
        canAddPatients: true,
        canAddConditions: true,
        addPatientRoute: ['clinician', 'patient', 'new'],
        addConditionRoute: ['clinician', 'condition', 'new'],
    };

    private _sidebarContent: Array<any> = [];

    constructor() {}

    get sidebarConfig(): SidebarConfig {
        return this._sidebarConfig;
    }

    set sidebarConfig(sidebarConfig: SidebarConfig) {
        this._sidebarConfig = sidebarConfig;
    }

    get sideBarContent() {
        return this._sidebarContent;
    }

    set sideBarContent(content: Array<any>) {
        this._sidebarContent = content;
    }
}
