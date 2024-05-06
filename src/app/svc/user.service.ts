import { Injectable } from '@angular/core';
import { BaseUser, UserType } from '../../api';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private user?: BaseUser;
    private userType?: UserType.TypeEnum;

    constructor() {}

    getUser() {
        return this.user;
    }

    setUser(user: BaseUser) {
        this.user = user;
    }

    getUserType() {
        return this.userType;
    }

    setUserType(userType?: UserType.TypeEnum) {
        this.userType = userType;
    }

    getName() {
        return `${this.user?.forename} ${this.user?.lastname}`;
    }
}
