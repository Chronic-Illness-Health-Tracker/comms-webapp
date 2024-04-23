import { Injectable } from '@angular/core';

export interface Toast {
    message: string;
    className: string;
    duration?: number;
}

export enum Severity {
    success,
    danger,
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    toasts: Toast[] = [];

    show(message: string, severity: Severity, duration: number) {
        let className = 'bg-success text-light high-z-index';

        if (severity === Severity.success) {
            className = 'bg-success text-light high-z-index';
        } else if (severity === Severity.danger) {
            className = 'bg-danger text-light high-z-index';
        }

        this.toasts.push({
            message: message,
            className: className,
            duration: duration,
        });
    }

    remove(toast: Toast) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

    clear() {
        this.toasts.splice(0, this.toasts.length);
    }
}
