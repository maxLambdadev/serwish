import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientType, UserType, AuthType } from '@models/index';
import { Store } from '@ngrx/store';
import { UserService } from '@services/user.service';
import { fetchUser } from '@store/user/user.actions';
import { Subject } from 'rxjs/internal/Subject';

import { SWShakeAnimation } from '@animations/index';

@Component({
  selector: 'sw-specialis-info',
  templateUrl: './specialist-info.component.html',
  styleUrls: ['./specialist-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWShakeAnimation]
})
export class SpecialistInfoComponent implements OnDestroy {

  @Output() changeAuthTab: EventEmitter<any> = new EventEmitter<any>();

  @Output() closeSidePanel: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private store: Store
  ) {
    this.specialisInfoForm = new UntypedFormGroup({
      personal: new UntypedFormControl(UserType.PERSONAL, { validators: Validators.required }),
      id_number: new UntypedFormControl('', {}),
      client_type: new UntypedFormControl(ClientType.EMPLOYEE, {})
    });
  }

  specialisInfoForm: UntypedFormGroup;
  registrationType: ClientType = ClientType.CLIENT;

  AUTHTYPE = AuthType;
  isLoadingResults: boolean;
  animationState = 'inactive';

  submited: boolean;

  waitingForCode: boolean = false;
  counter: number = 30;

  get activeType() { return this.specialisInfoForm.controls["personal"].value }

  private unsubscribe$: Subject<null> = new Subject();

  onSubmit(): void {
    if (this.specialisInfoForm.valid) {
      this.isLoadingResults = true;

      this.userService.updateUserType(this.specialisInfoForm.value)
        .subscribe((_res: any) => {
          this.isLoadingResults = false;
          this.closeSidePanel.emit();
          this.router.navigate(['/']);
          this.store.dispatch(fetchUser());
          this.cdr.markForCheck();
        }, (_error: any) => {
          this.isLoadingResults = false;
          this.cdr.markForCheck();
        });
    } else {
      this.reAnimate();
    }
  }

  onChangeAuthTab(authType: AuthType) {
    this.changeAuthTab.emit(authType);
  }

  reAnimate() {
    this.animationState = 'active';
  }

  reAnimattingDone() {
    this.animationState = 'inactive';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }


}
