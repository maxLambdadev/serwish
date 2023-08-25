import { animate, state, style, transition, trigger } from "@angular/animations";

/**
 * reusable animation for transform(scroll) using TS variable
 * @param timing - animation duration
 * USED IN COMPONENTS: bottom-navigation
 */
export const SWTransform = (timing: string) =>
    trigger('transform', [
        state('*', style({ transform: '{{transform}}' }), {
            params: { transform: '' },
        }),
        transition('false <=> true', [animate(timing)]),
    ]);