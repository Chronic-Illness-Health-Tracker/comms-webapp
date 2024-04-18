import { HttpInterceptorFn } from '@angular/common/http';
import { HelphiAuthService } from '@helphi/helphi-common-ui';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const token = inject(HelphiAuthService).getAccessToken();

    const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next(authReq);
};
