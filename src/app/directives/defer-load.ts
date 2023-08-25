import { isPlatformServer } from '@angular/common';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Output,
    PLATFORM_ID
} from '@angular/core';

@Directive({
    selector: '[SWDefer]',
})
export class DeferLoadDirective implements AfterViewInit {
    @Output() SWDefer: EventEmitter<void> = new EventEmitter();

    private observer?: IntersectionObserver;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private el: ElementRef
    ) { }

    private checkForIntersection = (
        entries: IntersectionObserverEntry[]
    ): void => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (this.checkIfIntersecting(entry)) {
                this.SWDefer.emit();

                this.observer.unobserve(this.el.nativeElement);
                this.observer.disconnect();
            }
        });
    };

    private checkIfIntersecting(entry: IntersectionObserverEntry): boolean {
        return entry.isIntersecting && entry.target === this.el.nativeElement;
    }

    ngAfterViewInit(): void {

        if (isPlatformServer(this.platformId)) {
            return;
        }

        this.observer = new IntersectionObserver((entries) => {
            this.checkForIntersection(entries);
        }, {});

        this.observer.observe(this.el.nativeElement);
    }
}
