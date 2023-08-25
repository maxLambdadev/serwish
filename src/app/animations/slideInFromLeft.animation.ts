import { animate, style, transition, trigger } from "@angular/animations";


export const SWSlideInFromLeftAnimation = trigger('slideInFromLeft', [

    transition(':enter', [
        style({ transform: 'translateX(0)' }),
        animate('300ms 90ms ease-in', style({ transform: 'translateX(-100%)' }))
    ]),
    transition(':leave', [
        // style({ transform: 'translateX(-100%)' }),
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateX(0%)' }))
    ])
]);
