import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-save-bar',
    standalone: true,
    imports: [],
    templateUrl: './save-bar.component.html',
    styleUrl: './save-bar.component.scss',
})
export class SaveBarComponent {
    @Output() saved = new EventEmitter<void>();
    @Output() cancelled = new EventEmitter<void>();
}
