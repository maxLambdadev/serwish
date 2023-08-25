import { HttpClient } from "@angular/common/http";
import { makeStateKey, StateKey, TransferState } from "@angular/platform-browser";
import { TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Observable } from "rxjs/internal/Observable";

export class TranslateBrowserLoader implements TranslateLoader {
    constructor(
        private http: HttpClient,
        private transferState: TransferState,
        private prefix: string,
        private suffix: string
    ) { }

    public getTranslation(lang: string): Observable<any> {
        const key: StateKey<number> = makeStateKey<number>('trasfer-translate-' + lang);
        let data: any;
        if (this.transferState.hasKey(key)) {
            data = this.transferState.get(key, null);
            this.transferState.remove(key);
            return new Observable((observer) => {
                observer.next(data);
                observer.complete();
            })
        } else {
            return new TranslateHttpLoader(this.http, this.prefix, this.suffix).getTranslation(lang);
        }
    }
}

export function traslateBrowserLoaderFactory(httpClient: HttpClient, trasnferState: TransferState) {
    return new TranslateBrowserLoader(httpClient, trasnferState, './assets/locales/', '.json')
}
