import { animate, style, transition, trigger } from "@angular/animations";

export const SWSlideInFromTopAnimation = trigger('slideInFromTop', [
    transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ opacity: 0.5, transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [
        animate('200ms ease-in', style({ opacity: 1, transform: 'translateY(-100%)' }))
    ])
]);
