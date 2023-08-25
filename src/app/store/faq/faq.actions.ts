
import { createAction, props } from '@ngrx/store';

/**
 * Fetch Faq
 */
export const fetchFaq = createAction(
    '[Faq] Fetch Faq',
    props<{ locale: string }>()
)

export const fetchFaqSuccess = createAction(
    '[Faq] Fetch Faq Success',
    props<{ faq: Array<any> }>()
)

export const fetchFaqFailure = createAction(
    '[Faq] Fetch Faq Failure',
    props<{ err: any }>()
)