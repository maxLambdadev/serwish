import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppEventsService {
    public data: any = {};
    private events: Map<string, EventEmitter<any>> = new Map<string, EventEmitter<any>>();

    constructor() { }

    setValue(property: string, value: any): void {
        this.data[property] = value;
        if (this.events.has(property)) {
            this.events.get(property).emit(value);
        }
    }

    getValue(property: string, $default: any = null) {
        if (this.data.hasOwnProperty(property)) {
            return this.data[property];
        }
        return $default;
    }

    on(property: string): EventEmitter<any> {
        if (!this.events.has(property)) {
            this.events.set(property, new EventEmitter());
        }
        return this.events.get(property);
    }
}
