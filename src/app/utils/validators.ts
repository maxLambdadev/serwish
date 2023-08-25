import {
    AbstractControl,
    FormGroup,
    UntypedFormGroup,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';

export class CustomValidators {
    constructor() { }

    static onlyChar(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value == '') return null;

            let re = new RegExp('^[a-zA-Z ]*$');
            if (re.test(control.value)) {
                return null;
            } else {
                return { onlyChar: true };
            }
        };
    }
    static mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup): any => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
            return null;
        };
    }
}

//Compare Password
export function comparisonValidator(): any {
    return (group: UntypedFormGroup): ValidationErrors => {
        const control1 = group.controls['password'];
        const control2 = group.controls['password_confirmation'];

        if (control2.value) {
            if (control1.value !== control2.value) {
                control2.setErrors({ notEquivalent: true });
            } else {
                control2.setErrors(null);
            }
        };
        return [];
    }

}