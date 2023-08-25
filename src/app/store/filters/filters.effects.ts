import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, map, withLatestFrom } from 'rxjs/operators';

import * as filtersActions from './filters.actions';

import * as routerActions from '../router/router.actions';

import { selectSelectedCities, selectSelectedCategories } from './filters.selectors';

@Injectable({
    providedIn: 'root'
})
export class FiltersEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private router: Router
    ) { }

    removeCategoriesFilter$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(routerActions.removeCategories),
                map(action => action),
                map((_action) => {
                    return filtersActions.clearSelectedCategories();
                })
            )
    );

    removeCitiesFilter$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(routerActions.removeCities),
                map(action => action),
                map((_action) => {
                    return filtersActions.clearSelectedCities();
                })
            )
    );

    chagneCategoryFilter$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(filtersActions.toggleCategory),
                map(action => action),
                withLatestFrom(this.store.select(selectSelectedCategories)),
                tap(([_action, selectedCategories]) => {
                    const navExtras: NavigationExtras = {
                        queryParamsHandling: 'merge',
                        queryParams: {
                            categories: selectedCategories ? selectedCategories : []
                        }
                    };
                    this.router.navigate([], navExtras);

                })
            ), { dispatch: false }
    );

    chagneLocationFilter$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(filtersActions.toggleCity),
                map(action => action),
                withLatestFrom(this.store.select(selectSelectedCities)),
                tap(([_action, selectedCities]) => {
                    const navExtras: NavigationExtras = {
                        queryParamsHandling: 'merge',
                        queryParams: {
                            cities: selectedCities ? selectedCities : []
                        }
                    };
                    this.router.navigate([], navExtras);

                })
            ), { dispatch: false }
    );

}
