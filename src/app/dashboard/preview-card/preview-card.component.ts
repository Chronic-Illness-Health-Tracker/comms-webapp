import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-preview-card',
    standalone: true,
    imports: [NgClass],
    templateUrl: './preview-card.component.html',
    styleUrl: './preview-card.component.scss',
})
export class PreviewCardComponent {
    @Input({ required: true }) data!: any;
}
