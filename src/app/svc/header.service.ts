import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HeaderService {
    private _header: string = '';

    public get header(): string {
        return this._header;
    }

    public set header(header: string) {
        this._header = header;
    }
}
