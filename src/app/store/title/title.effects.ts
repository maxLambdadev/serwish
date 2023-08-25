import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { RouterStateUrl } from '../../sw-route.serilizer';
import { SeoService } from '@services/seo.service';


@Injectable({
    providedIn: 'root'
  })
export class TitleEffects {
    constructor(
        private actions$: Actions,
        private seoService: SeoService
    ) { }

    title$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ROUTER_NAVIGATED),
                map((action: RouterNavigatedAction<RouterStateUrl>) => {
                    return action.payload.routerState;
                }),
                tap((routerstate: RouterStateUrl) => {
                    this.seoService.setSeo(routerstate.url);
                })
            ), { dispatch: false }
    );
}
