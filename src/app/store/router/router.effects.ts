import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import * as routerActions from '../router/router.actions';

import * as filtersActions from '../filters/filters.actions';

import { NavigationExtras, Router } from '@angular/router';
import { getActiveRoutes } from './router.selectors';
import { Store } from '@ngrx/store';
import { UserType } from '@models/user';


@Injectable({
    providedIn: 'root'
})
export class RouterEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private store: Store
    ) { }

    changeLang$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(routerActions.changeLang),
                map(action => action.lang),
                tap((lang) => {

                    const navExtras: NavigationExtras = {
                        queryParamsHandling: 'merge',
                        queryParams: {
                            locale: lang,
                        }
                    };
                    this.router.navigate([], navExtras);

                })
            ), { dispatch: false }
    );

    changeQualityFIlter$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(routerActions.changeQualityFIlter),
                map(action => action),
                withLatestFrom(this.store.select(getActiveRoutes)),
                tap(([_action, currState]) => {

                    const navExtras: NavigationExtras = {
                        queryParamsHandling: 'merge',
                        queryParams: {
                            quality: currState.queryParams?.quality ? null : 1
                        }
                    };
                    this.router.navigate([], navExtras);

                })
            ), { dispatch: false }
    );

    changeUserTypeFilter$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(routerActions.changeUserTypeFilter),
                map(action => action),
                withLatestFrom(this.store.select(getActiveRoutes)),
                tap(([action, currState]) => {

                    let personalValue: UserType;

                    if (action.userType === 'personal') {
                        personalValue = UserType.PERSONAL
                        if (currState.queryParams?.personal === 'personal') {
                            personalValue = null;
                        }
                    }

                    if (action.userType === 'business') {
                        personalValue = UserType.BUSINESS
                        if (currState.queryParams?.personal === 'business') {
                            personalValue = null;
                        }
                    }

                    const navExtras: NavigationExtras = {
                        queryParamsHandling: 'merge',
                        queryParams: {
                            personal: personalValue
                        }
                    };
                    this.router.navigate([], navExtras);

                })
            ), { dispatch: false }
    );

    syncSelectedCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerActions.syncSelectedCategories),
            map(action => action),
            withLatestFrom(this.store.select(getActiveRoutes)),
            map(([_action, currState]) => {

                let categories = currState.queryParams?.categories;
                let selectedCategories: Array<number> = [];

                if (categories) {
                    //Fix This
                    if (categories instanceof Array) {
                        selectedCategories = categories.map((value: any) => {
                            return parseInt(value);
                        });
                    } else {
                        selectedCategories.push(parseInt(categories));
                    }
                }

                return filtersActions.syncSelectedCategoriesFilter({ selectedCategories: selectedCategories ? selectedCategories : [] });
            })
        )
    );


    syncSelectedCities$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerActions.syncSelectedCities),
            map(action => action),
            withLatestFrom(this.store.select(getActiveRoutes)),
            map(([_action, currState]) => {

                let cities = currState.queryParams?.cities;
                let selectedCities: Array<number> = [];

                if (cities) {
                    //Fix This
                    if (cities instanceof Array) {
                        selectedCities = cities.map((value: any) => {
                            return parseInt(value);
                        });
                    } else {
                        selectedCities.push(parseInt(cities));
                    }
                }

                return filtersActions.syncSelectedCitiesFilter({ selectedCities: selectedCities ? selectedCities : [] })
            })
        )
    );


    removeCategoriesFilter$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(routerActions.removeCategories),
                map(action => action),
                tap((_action) => {

                    const navExtras: NavigationExtras = {
                        queryParamsHandling: 'merge',
                        queryParams: {
                            categories: null
                        }
                    };
                    this.router.navigate([], navExtras);

                })
            ), { dispatch: false }
    );


    removeCitiesFilter$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(routerActions.removeCities),
                map(action => action),
                tap((_action) => {

                    const navExtras: NavigationExtras = {
                        queryParamsHandling: 'merge',
                        queryParams: {
                            cities: null
                        }
                    };
                    this.router.navigate([], navExtras);

                })
            ), { dispatch: false }
    );
}
