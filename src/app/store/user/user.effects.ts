import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '@models/index';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { UserService } from '@services/user.service';

import { of } from 'rxjs/internal/observable/of';

import {
    catchError,
    filter,
    map,
    switchMap
} from 'rxjs/operators';

import * as userActions from './user.actions';

@Injectable({
    providedIn: 'root'
})
export class UserEffects {

    constructor(
        @Inject(PLATFORM_ID) private platformId: {},
        private actions$: Actions,
        private userService: UserService
    ) { }

    fetchUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.fetchUser),
            filter(() => {
                return isPlatformBrowser(this.platformId)
            }),
            switchMap(() => {
                return this.userService.getUser()
                    .pipe(
                        map((user: User) => {
                            return userActions.fetchUserSuccess({ user: user });
                        }),
                        catchError((err: any) =>
                            of(userActions.fetchUserFailure({ err: err }))
                        )
                    );
            })
        )
    );
}
