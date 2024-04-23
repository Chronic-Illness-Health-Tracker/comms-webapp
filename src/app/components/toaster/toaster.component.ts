import { Component } from '@angular/core';
import { ToastService } from '../../svc/toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-toaster',
    standalone: true,
    imports: [NgbToastModule, NgTemplateOutlet],
    templateUrl: './toaster.component.html',
    styleUrl: './toaster.component.scss',
})
export class ToasterComponent {
    constructor(public toastService: ToastService) {}
}
