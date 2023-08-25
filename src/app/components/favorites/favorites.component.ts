import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Injector, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { toggleFavorite, selectIsFavorite } from '@store/index';
import { Page, AppEvents } from '@models/index';
import { CdkPortal, DomPortalOutlet, PortalOutlet } from '@angular/cdk/portal';
import { Observable } from 'rxjs/internal/Observable';




@Component({
    selector: 'sw-favorite',
    templateUrl: 'favorites.component.html',
    styleUrls: ['favorites.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('fadeInSlow', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-in', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('300ms ease-in', style({ opacity: 0 }))
            ])
        ]),
        trigger(
            'inOutAnimation',
            [
                transition(':enter', [
                    style({ transform: 'scale(1.3)' }),
                    animate('200ms ease-in', style({ transform: 'scale(1)' }))
                ])
            ]
        )
    ]
})
export class FavoriteComponent implements OnInit {

    @ViewChild(CdkPortal) portal: CdkPortal;

    @Input() id: number;

    @Input() isWishlist: boolean = false;

    @Output() removeFromWishlist: EventEmitter<any> = new EventEmitter();

    isFavorite$: Observable<boolean>;

    constructor(
        private store: Store,
        private cdr: ChangeDetectorRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private appRef: ApplicationRef
    ) { }

    activePage: string = Page.HOME;

    APP_EVENTS = AppEvents;

    portalHost: PortalOutlet;

    timer: any;

    ngOnInit() {
        this.isFavorite$ = this.store.select(selectIsFavorite(this.id));
    }

    showNotification() {
        // Create a portalHost from a DOM element
        this.portalHost = new DomPortalOutlet(
            document.querySelector('.sw-portal-content'),
            this.componentFactoryResolver,
            this.appRef,
            this.injector
        );

        // Attach portal to host
        this.portalHost.attach(this.portal);
    }

    favouriteClick(id: number, $event: any) {

        if (this.portalHost) {
            this.portalHost.detach();
            clearTimeout(this.timer);
        }

        if ($event) {
            $event.stopPropagation();
            $event.preventDefault();
        }

        this.store.dispatch(toggleFavorite({ id: id }))
        this.showNotification();

        this.timer = setTimeout(() => {
            this.portalHost.detach();
            this.cdr.detectChanges();
        }, 1200);

        if (this.isWishlist) {
            this.removeFromWishlist.emit();
        }

        this.cdr.markForCheck();
    }

}

