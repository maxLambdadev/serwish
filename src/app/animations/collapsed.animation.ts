import { animate, keyframes, style, transition, trigger } from "@angular/animations";

export const SWCollapseAnimation = trigger('collapseAnimation', [
    transition(':enter', [
        animate(
            '150ms cubic-bezier(0, 0, 0.58, 1)',
            keyframes([
                style({ opacity: 0, height: 0, offset: 0 }),
                style({ height: '*', offset: 0.7 }),
                style({ opacity: '*', offset: 1 }),
            ])
        ),
    ]),
    transition(':leave', [
        animate(
            '150ms cubic-bezier(0, 0, 0.58, 1)',
            keyframes([
                style({ opacity: 0, offset: 0.7 }),
                style({ height: 0, offset: 1 }),
            ])
        ),
    ]),
]);