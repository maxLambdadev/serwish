import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit, ViewEncapsulation } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Device, ClientType, User, UserType } from "@models/index";
import { Store } from "@ngrx/store";
import { DeviceService, SmsService, UserService } from "@services/index";
import { fetchUser, selectUser } from "@store/index";
import { formatDate } from "@utils/utils";
import { comparisonValidator } from "@utils/validators";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/operators";
import { SWCollapseAnimation } from "@animations/index";


export enum ProfileGroups {
    OVERAL_INFO = 'overal-info',
    PHONE_NUMBER = 'phone-number',
    PASSWORD = 'password',
    SPECIALIST_INFO = "specialist-info"
}

@Component({
    selector: 'sw-profile-page',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [SWCollapseAnimation]
})
export class ProfilePageComponent implements OnInit {

    @HostBinding('class.sw-profile-page') className: boolean = true;

    constructor(
        private store: Store,
        private smsService: SmsService,
        private userServuce: UserService,
        private cdr: ChangeDetectorRef,
        private deviceService: DeviceService
    ) {
        this.userForm = new UntypedFormGroup({
            overalInfo: new UntypedFormGroup({
                name: new UntypedFormControl('', { validators: [Validators.minLength(3)] }),
                gender: new UntypedFormControl('male', {}),
                date_of_birth: new UntypedFormControl('', { validators: Validators.required })
            }),
            personal: new UntypedFormControl(UserType.PERSONAL, { validators: Validators.required }),
            id_number: new UntypedFormControl('', {}),
            phone_number: new UntypedFormControl('', { validators: [Validators.required, Validators.minLength(9)] }),
            new_phone_number: new UntypedFormControl('', { validators: [Validators.required, Validators.minLength(9)] }),
            sms_validation: new UntypedFormControl('', { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)] }),
            password: new UntypedFormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
            password_confirmation: new UntypedFormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
        });

        this.userForm.setValidators(comparisonValidator())
    }

    device: Device = this.deviceService.getDevice();
    DEVICE = Device;

    userForm: UntypedFormGroup;

    CLIENT_TYPE = ClientType;
    PROFILE_GROUPS = ProfileGroups;
    USER_TYPE = UserType;

    user: User;
    userId: number;
    user$: Observable<User> = this.store.select(selectUser);

    isEditMode: boolean = false;
    editingGrop: ProfileGroups;

    waitingForCode: boolean = false;
    counter: number = 30;

    private unsubscribe$: Subject<null> = new Subject();

    ngOnInit(): void {

        this.userForm.get('overalInfo').disable();
        this.userForm.get('phone_number').disable();
        this.userForm.get('password').disable();
        this.userForm.get('password_confirmation').disable();

        this.userForm.get('id_number').disable();
        this.userForm.get('personal').disable();

        this.user$.pipe(takeUntil(this.unsubscribe$))
            .subscribe((user: User) => {
                this.user = user;
                this.userId = user.id;

                this.setFormValues(user);

                this.cdr.markForCheck();
            });

    }

    get activeType(): UserType {
        return this.userForm.controls["personal"].value
    }

    onSubmit(): void {

    }

    getVerificationCode() {

        let phoneNumber: number = parseInt(this.userForm.controls["new_phone_number"].value);
        let phoneNumberValid: boolean = this.userForm.controls["new_phone_number"].valid;

        if (this.waitingForCode) {
            return
        }

        if (phoneNumberValid) {
            this.waitingForCode = true;
            this.smsService.sendSMS(phoneNumber).pipe(takeUntil(this.unsubscribe$))
                .subscribe(() => {

                    let intervalId = setInterval(() => {
                        this.counter = this.counter - 1;
                        if (this.counter === 0) {
                            this.counter = 30;
                            clearInterval(intervalId)
                            this.waitingForCode = false;
                        }
                        this.cdr.markForCheck();
                    }, 1000)

                });
        }
    }

    updatePhone() {

        let newPhoneNumber: number = parseInt(this.userForm.controls["new_phone_number"].value);
        let sms_validation: number = parseInt(this.userForm.controls["sms_validation"].value);

        let smsNumberValid: boolean = this.userForm.controls["sms_validation"].valid;
        let phoneNumberValid: boolean = this.userForm.controls["new_phone_number"].valid;

        if (smsNumberValid && phoneNumberValid) {

            let data: any = {
                "new_phone_number": newPhoneNumber,
                "sms_validation": sms_validation,
            }

            this.userServuce.updateUserPhone(data)
                .subscribe((res: any) => {

                    if (res.message === "incorrect code") {

                        this.userForm.controls['sms_validation'].setErrors({
                            invalidSMS: true
                        });

                    } else {
                        this.store.dispatch(fetchUser());
                        this.cancelEdit();
                    }


                    this.cdr.markForCheck();
                });

        }
    }

    updateOveralInfo() {

        let overalInfo = this.userForm.get("overalInfo").value;
        let overalInfoValid: boolean = this.userForm.get("overalInfo").valid;

        if (overalInfoValid) {
            this.userServuce.updateUserOveralInfo(overalInfo)
                .subscribe((_res: any) => {
                    this.store.dispatch(fetchUser());
                    this.cancelEdit();
                    this.cdr.markForCheck();
                });
        }
    }

    updateSpecialistInfo() {

        let id_Number = this.userForm.get("id_number").value;
        let personal = this.userForm.get("personal").value;

        let idNumberValid = this.userForm.get("id_number").valid;
        let personalValid = this.userForm.get("personal").valid;

        if (idNumberValid && personalValid) {
            let data: any = {
                "id_number": id_Number,
                "personal": personal,
            }
            this.userServuce.updateSpecialistInfo(data)
                .subscribe((_res: any) => {
                    this.store.dispatch(fetchUser());
                    this.cancelEdit();
                    this.cdr.markForCheck();
                });
        }

    }

    updatePassword() {

        let password = this.userForm.get("password").value;
        let password_confirmation = this.userForm.get("password_confirmation").value;

        let passwordValid = this.userForm.get("password").valid;
        let passwordConfirmationValid = this.userForm.get("password_confirmation").valid;

        if (passwordValid && passwordConfirmationValid) {
            let data: any = {
                "password": password,
                "password_confirmation": password_confirmation,
            }
            this.userServuce.updatePassword(data)
                .subscribe((_res: any) => {
                    this.store.dispatch(fetchUser());
                    this.cancelEdit();
                    this.cdr.markForCheck();
                });
        }

    }

    setFormValues(user: User) {

        this.userForm.get('overalInfo.name').setValue(user.name);
        this.userForm.get('overalInfo.gender').setValue(user.gender);
        this.userForm.get('overalInfo.date_of_birth').setValue(formatDate(user.date_of_birth));
        this.userForm.get('phone_number').setValue(user.phone_number);

        this.userForm.get('id_number').setValue(user.id_number);
        this.userForm.get('personal').setValue(user.personal);

    }

    clickEdit(groupName: ProfileGroups) {

        if (this.isEditMode) {
            return;
        }

        this.isEditMode = true;
        this.editingGrop = groupName;
        this.checkGropEditStatus();
    }

    cancelEdit() {
        this.isEditMode = false;
        this.editingGrop = null;

        this.userForm.get('overalInfo').disable();
        this.userForm.get('phone_number').disable();
        this.userForm.get('password').disable();
        this.userForm.get('password_confirmation').disable();
        this.userForm.get('id_number').disable();
        this.userForm.get('personal').disable();

        this.checkGropEditStatus();
    }

    checkGropEditStatus() {

        // OVERAL_INFO = 'overal-info',
        // PHONE_NUMBER = 'phone-number',
        // PASSWORD = 'password',
        // SPECIALIST_INFO = "specialist-info"

        switch (this.editingGrop) {
            case ProfileGroups.OVERAL_INFO: {
                this.userForm.get('overalInfo').enable();
                break;
            }
            case ProfileGroups.PHONE_NUMBER: {
                this.userForm.get('phone_number').enable();
                break;
            }
            case ProfileGroups.PASSWORD: {
                this.userForm.get('password').enable();
                this.userForm.get('password_confirmation').enable();
                break;
            }
            case ProfileGroups.SPECIALIST_INFO: {
                this.userForm.get('id_number').enable();
                this.userForm.get('personal').enable();
                break;
            }
            default: {
                //statements; 
                break;
            }
        }

    }




    ngOnDestroy(): void {
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }


}