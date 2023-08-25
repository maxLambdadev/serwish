import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FaqState } from './faq.reducer';

export const selectFaqState = createFeatureSelector<FaqState>('faq');

export const selectFaq = createSelector(
  selectFaqState,
  (state: FaqState) => {
    return state.faq;
  }
);
