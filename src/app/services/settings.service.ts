import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { LANGS } from '../config/config';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private trasnalteService: TranslateService
    ) { }

    LANGS = LANGS;

    private activeLang: Subject<any> = new BehaviorSubject<any>(this.trasnalteService.currentLang);
    activeLang$ = this.activeLang.asObservable();

    updateActiveLang(lang: string): void {
        this.activeLang.next(lang);

        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('lang', lang.toString());
            document.documentElement.lang = lang;
            this.trasnalteService.use(lang);
        }
    }


}