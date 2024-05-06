import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../svc/user.service';
import { UserType } from '../../api';

export const clinicianGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService);

    return userService.getUserType() === UserType.TypeEnum.CLINITIAN
        ? true
        : false;
};
