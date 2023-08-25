import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { Portal, TemplatePortal } from "@angular/cdk/portal";
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Device, Service } from "@models/index";
import { Store } from "@ngrx/store";
import { DeviceService, ServicesService } from "@services/index";
import { fetchMyServices, selectMyServices } from "@store/index";
import { counter } from "@utils/utils";
import { Observable, Subject, takeUntil } from "rxjs";
import { SWFadeInAnimation } from "@animations/index";


@Component({
    selector: 'sw-my-services-page',
    templateUrl: './my-services.component.html',
    styleUrls: ['./my-services.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [SWFadeInAnimation]
})
export class MyServicesComponent implements OnInit {

    @ViewChild('reviewPopupContent') reviewPopupContent: TemplateRef<unknown>;

    services$: Observable<Service[]> = this.store.select(selectMyServices);

    boostPopupPortal: Portal<any>;
    boostPopupOverlayRef: OverlayRef;

    boostForm: UntypedFormGroup;
    packets: Array<any>;

    private unsubscribe$: Subject<null> = new Subject();

    constructor(
        private store: Store,
        private deviceService: DeviceService,
        private servicesService: ServicesService,
        private viewContainerRef: ViewContainerRef,
        private overlay: Overlay,
    ) {

        this.boostForm = new UntypedFormGroup({
            packet_id: new UntypedFormControl(null, { validators: [Validators.required] })
        });
    }

    ngOnInit(): void {
        this.store.dispatch(fetchMyServices());
    }

    device: Device = this.deviceService.getDevice();
    DEVICE = Device;

    choosenBoostServiceId: number;

    counter = counter;

    openBoostPopup(id: number): void {

        this.servicesService.getVipList()
            .pipe(
                takeUntil(this.unsubscribe$))
            .subscribe((packets: any) => {
                this.packets = packets;
            })

        this.choosenBoostServiceId = id;

        this.boostPopupPortal = new TemplatePortal(
            this.reviewPopupContent,
            this.viewContainerRef
        );

        let config: OverlayConfig;

        if (this.device === Device.MOBILE) {
            config = new OverlayConfig({
                hasBackdrop: true,
                panelClass: 'sw-full',
                positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
            });

        } else {
            config = new OverlayConfig({
                hasBackdrop: true,
                positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
            });

        }

        this.boostPopupOverlayRef = this.overlay.create(config);
        this.boostPopupOverlayRef.attach(this.boostPopupPortal);

        this.boostPopupOverlayRef.backdropClick().subscribe(() => this.detechBoostPopup());
    }

    detechBoostPopup(): void {
        this.boostPopupOverlayRef.detach()
        this.choosenBoostServiceId = null;
    }

    onSubmit(): void {
        const vipPacketId = this.boostForm.value.packet_id;
        this.servicesService.boostService(vipPacketId, this.choosenBoostServiceId)
            .pipe(
                takeUntil(this.unsubscribe$))
            .subscribe((paymentURL: any) => {
                window.location.replace(paymentURL);
            })
    }

    trackBy(index: number, _item: any) {
        return index;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }

}