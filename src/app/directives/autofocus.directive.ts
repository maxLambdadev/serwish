import { Directive,  ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[myAutofocus]'
})
export class AutoFocusDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef) { };

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.focus();
    }

}