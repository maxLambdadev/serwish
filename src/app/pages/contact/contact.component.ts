import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Device } from "@models/index";
import { ContactService, DeviceService } from "@services/index";
import { SOCIAL_NETWORKS } from "src/app/config/config";

@Component({
    selector: 'sw-contact-page',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ContactComponent {

    @HostBinding('class.sw-contact-page') className: boolean = true;

    contactForm: UntypedFormGroup;

    constructor(
        private contactService: ContactService,
        private deviceService: DeviceService,
        private cdr: ChangeDetectorRef
    ) {
        this.contactForm = new UntypedFormGroup({
            name: new UntypedFormControl('', [Validators.required]),
            email: new UntypedFormControl('', [Validators.email]),
            description: new UntypedFormControl('', [Validators.required]),
            phone_number: new UntypedFormControl('', { validators: [Validators.required, Validators.minLength(9)] }),
        });
    }

    device: Device = this.deviceService.getDevice();
    DEVICE = Device;

    socials = SOCIAL_NETWORKS;

    successMessage: boolean = false;

    onSubmit(): void {
        if (this.contactForm.valid) {
            const name = this.contactForm.value.name;
            const email = this.contactForm.value.email;
            const description = this.contactForm.value.description;
            const phone = this.contactForm.value.phone_number;

            let data: any = {
                "title": name,
                "email": email,
                "description": description,
                "phone": phone
            }

            this.contactService.submitContact(data).subscribe(() => {
                this.successMessage = true;
                this.cdr.markForCheck();
            });

        }
    }

    trackBy(index: number, _item: any) {
        return index;
    }

}