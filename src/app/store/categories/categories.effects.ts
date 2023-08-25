import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, filter, switchMap, withLatestFrom } from 'rxjs/operators';
import * as categoryActions from './categories.actions';
import { of } from 'rxjs/internal/observable/of';
import { Store } from "@ngrx/store";
import { CategoriesService } from "@services/categories.service";
import { selectCategoriesLoadingsStatus } from "./categories.selectors";
import { RouterNavigatedAction, ROUTER_NAVIGATED } from "@ngrx/router-store";
import { RouterStateUrl, getPrevState } from "@store/index";
import { CategoriesFilterArgs, Category, CategoryType, LoadingStatus } from "@models/index";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class CategoryEffects {
    constructor(
        @Inject(PLATFORM_ID) private platformId: {},
        private actions$: Actions,
        private store: Store,
        private categoriesService: CategoriesService
    ) { }

    categoriesPolling$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            filter(() => {
                return isPlatformBrowser(this.platformId)
            }),
            map((action: RouterNavigatedAction<RouterStateUrl>) => {
                return action.payload.routerState.queryParams;
            }),
            withLatestFrom(
                this.store.select(selectCategoriesLoadingsStatus),
                this.store.select(getPrevState)
            ),
            filter(([queryParams, loadingStatus, prevState]) => {
                return (loadingStatus != LoadingStatus.LOADED || (queryParams.locale !== prevState.queryParams.locale));
            }),
            map(([queryParams, _loadingStatus, _prevstate]) => {
                const args: CategoriesFilterArgs = {
                    locale: queryParams.locale || 'ka',
                    type: CategoryType.SPECIALIST
                };
                return categoryActions.fetchCategories({ categoriesFilterArgs: args });
            })
        )
    );

    categories$ = createEffect(() => this.actions$.pipe(
        ofType(categoryActions.fetchCategories),
        withLatestFrom(this.store.select(selectCategoriesLoadingsStatus)),
        switchMap(([args, _loadingStatus]) => {
            return this.categoriesService.getCategories(args.categoriesFilterArgs)
                .pipe(
                    map((categories: Category[]) => {
                        return categoryActions.fetchCategoriesSuccess({ categories: categories.reverse() });
                    }),
                    catchError((err: any) =>
                        of(categoryActions.fetchCategoriesFailure({ err: err }))
                    )
                )
        })
    ))

}