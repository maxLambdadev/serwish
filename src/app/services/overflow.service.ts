import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class OverFlowService {
    private bodyElem: CSSStyleDeclaration;

    constructor(
        @Inject(DOCUMENT) private document: Document) {
        this.bodyElem = this.document.body.style;
    }

    public hide(): void {
        this.bodyElem.setProperty('overflow', 'hidden');
    }

    public show(): void {
        this.bodyElem.removeProperty('overflow');
    }
}
