
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    HostBinding,
    SimpleChanges,
    Inject,
    PLATFORM_ID,
    OnChanges
} from '@angular/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { Subject } from 'rxjs/internal/Subject';


export enum IMAGE_FORMAT {
    PNG = 'png',
    JPEG = 'jpeg',
}

@Component({
    selector: 'sw-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent implements OnInit, OnChanges {
    @HostBinding('class.sw-image') className: Boolean = true;

    @Input() src: string = '';

    @Input() alt: string = '';

    @Input() format: IMAGE_FORMAT = IMAGE_FORMAT.PNG;

    @Input() height: number;

    @Input() width: number;

    @Input() absolute: boolean = false;

    @Input() noWEBP: boolean;

    @Input() noSRCSET: boolean;

    @Output() loadImage: EventEmitter<any> = new EventEmitter();

    @Output() errorImage: EventEmitter<any> = new EventEmitter();

    renderImage: boolean = isPlatformServer(this.platformId) ? true : this.transferState.hasKey(makeStateKey(this.src));
    isImageLoaded: boolean = false;

    imageSrc: string;

    private unsubscribe$: Subject<void> = new Subject();

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private transferState: TransferState
    ) { }

    ngOnInit() {
        const key: StateKey<boolean> = makeStateKey<boolean>(this.src);
        if (isPlatformBrowser(this.platformId)) {
            this.renderImage = this.transferState.hasKey(key);
        }
        if (isPlatformServer(this.platformId)) {
            this.transferState.set(key, true);
        }

        this.imageSrc = this.src + '.' + this.format
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if (simpleChanges['src']) {
            this.imageSrc = this.src + '.' + this.format;
        }
    }

    generateUrl(format: string) {

        if (this.absolute) {
            return this.src;
        }

        let srcset: string;

        srcset =
            this.src + '.' + format + ', '
            + this.src +
            '@2x.' + format + ' 2x,'
            + this.src +
            '@3x.' + format + ' 3x';

        return srcset;
    }

    onLoadImage($event: any) {
        this.loadImage.emit($event);
    }


    ngOnDestroy(): void {
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }
}
