import { Injector } from "@angular/core";
import { makeStateKey, StateKey, TransferState } from "@angular/platform-browser";
import { TranslateLoader } from "@ngx-translate/core";
import { join } from 'path';
import * as fs from 'fs';
import { Observable } from "rxjs/internal/Observable";

export class TrasnlateServerLoader implements TranslateLoader {
    private locales: any;
    constructor(
        private transferState: TransferState,
        private injector: Injector,
        private prefix: string = './locales/',
        private suffix: string = '.json'
    ) {
        this.locales = this.injector.get('LOCALES');
    }

    public getTranslation(lang: string): Observable<any> {
        return new Observable((observer) => {
            let jsonData;
            if(this.locales && this.locales[lang]) {
                jsonData = this.locales[lang];
            } else {
                const assets_folder = join(
                    process.cwd(),
                    'dist',
                    'serwish',
                    'browser',
                    'assets',
                    this.prefix
                  );
                jsonData = JSON.parse(fs.readFileSync(`${assets_folder}${lang}${this.suffix}`, 'utf8'));
            }
            const key: StateKey<number> = makeStateKey<number>('trasfer-translate-' + lang);
            this.transferState.set(key, jsonData);
            observer.next(jsonData);
            observer.complete();
        })
    }
}

export function translateServerLoaderFactory(trasferState: TransferState, injector: Injector) {
    return new TrasnlateServerLoader(trasferState, injector);
}