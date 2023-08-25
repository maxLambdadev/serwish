import { Action, createReducer, on } from '@ngrx/store';
import * as faqActions from './faq.actions';
import { Service } from '@models/service';

export interface FaqState {
  faq: Array<Service>;
}

export const faqInitState: FaqState = {
  faq: new Array<Service>()
};

const _faqReducer = createReducer(
  faqInitState,

  /**
 * fetch service list actions
 */
  on(faqActions.fetchFaq, (state: FaqState, _action) => {
    return {
      ...state,
      faq: []
    };
  }),
  on(faqActions.fetchFaqSuccess, (state: FaqState, action) => {

    let faqSort = [...action.faq]
    let faq: Array<any> = faqSort.reverse();

    return {
      ...state,
      faq: faq
    };
  }),
  on(faqActions.fetchFaqFailure, (state: FaqState, _action) => {
    return {
      ...state
    };
  })

);

export function faqReducer(state: FaqState, action: Action) {
  return _faqReducer(state, action);
}