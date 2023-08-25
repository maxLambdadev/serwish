import {
    trigger, style, transition,
    animate
} from '@angular/animations';

export const SWSlideUpDownAnimation = [
    trigger('slideUpDown', [
        transition(':enter', [style({ height: 0, opacity: 0 }), animate(200)]),
        transition(':leave', [animate(100, style({ height: 0, opacity: 0 }))]),
    ]),
]
