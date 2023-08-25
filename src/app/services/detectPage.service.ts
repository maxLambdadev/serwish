import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DetectPageService {

    private bodyElem: HTMLElement;
    private htmlElem: HTMLElement;

    constructor(
        @Inject(DOCUMENT) private document: Document) {
        this.bodyElem = this.document.body;
        this.htmlElem = this.document.documentElement;
    }

    public addClass(pageName: string): void {
        this.bodyElem.classList.add(pageName);
        this.htmlElem.classList.add(pageName);
    }

    public removeClass(pageName: string): void {
        this.bodyElem.classList.remove(pageName);
        this.htmlElem.classList.remove(pageName);
    }
}
