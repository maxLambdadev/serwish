import { AfterViewInit, Component, Directive, ElementRef, HostBinding, Input, Optional, Renderer2, Self, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Device } from '@models/index';
import { SWSlideUpDownAnimation } from '@animations/index';


export enum InputSize {
  X_SMALL = 'x-small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  X_LARGE = 'x-large',
}

export enum InputType {
  TITLE_IN = 'title-in',
  TITLE_ABOVE = 'title-above'
}

@Component({
  selector: 'sw-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    SWSlideUpDownAnimation
  ],
})
export class InputComponent implements AfterViewInit, ControlValueAccessor {

  @ViewChild('label', { static: false }) label: ElementRef;

  @HostBinding('class.sw-input') className: boolean = true;

  @HostBinding('class.sw-input--filled') public get isFilled(): boolean {
    return this.data && this.data.length > 0;
  }

  @HostBinding('class.hasErrors') public get hasErrors(): boolean {
    return this.showErrors;
  }


  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Self() @Optional() public control: NgControl
  ) {
    this.control && (this.control.valueAccessor = this);
    this.errorMessages.set('required', () => "*სავალდებულოა!");
    this.errorMessages.set('notEquivalent', () => "*პაროლები არ ემთხვევა");
    this.errorMessages.set('invalidPassword', () => "*პაროლი არასწორია!");
    this.errorMessages.set('minlength', (params: any) => {
      return "*მინ. " + params.requiredLength + " სიმბოლო!"
    });
    this.errorMessages.set('maxlength', (params: any) => {
      return "*მაქს. " + params.requiredLength + " სიმბოლო!"
    });
    this.errorMessages.set('invalidSMS', () => "*სმს კოდი არასწორია!");
    this.errorMessages.set('phoneExists', () => "*მომხმარებელი ესეთი ტელეფონით არსებობს!");
    this.errorMessages.set('invalidPasswordOrUsername', () => "*პაროლი ან ტელეფონი არასწორია!");
  }

  @Input() device: Device;
  @Input() size: InputSize = InputSize.LARGE;
  @Input() type: InputType = InputType.TITLE_IN;
  @Input() inputType: string;
  @Input() labelText: string;

  @Input() name: string;

  @Input() mask: string;

  @Input() prefix: string;

  @Input() maxlength: number;

  DEVICE = Device;
  INPUT_SIZE = InputSize

  placeholder: string = '';

  ngAfterViewInit(): void {
    if (this.size) {
      this.renderer.addClass(this.getHostElement(), 'sw-input--' + this.size);

      if (this.label) {
        this.renderer.addClass(this.label.nativeElement, 'sw-input__label__text--' + this.size);
      }

    }
  }

  @Input() placeholderDraft: string;

  @Input() required = false;

  @Input() disabled = false;

  @Input() data: string;

  @Input() showErrors: boolean;

  private errorMessages = new Map<string, (params: any) => string>();

  public onChangeFn = (_: any) => { };

  public onTouchedFn = () => {
    this.placeholder = "";
  };

  public onFocusFn = () => {
    this.placeholder = this.placeholderDraft;
  }

  public onBlurFn = () => {
    this.placeholder = "";
  };

  public get invalid(): boolean {
    return this.control ? this.control.invalid : false;
  }

  public get showError(): boolean {
    if (!this.control) {
      return false;
    }

    return this.invalid;
  }

  public get errors(): Array<string> {
    if (!this.control) {
      return [];
    }

    const errors = this.control.errors;
    if (errors) {
      return Object.keys(errors).map(key => {
        if (this.errorMessages.has(key)) {
          const func = this.errorMessages.get(key);
          if (func) {

            return func(errors[key])
          }
          return '';
        } else {
          return <string>errors[key] || key
        }
      });
    }
    return [];
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(obj: any): void {
    this.data = obj;

  }

  public onChange() {
    this.onChangeFn(this.data);
  }


  getHostElement() {
    return this.elementRef.nativeElement;
  }

  hasHostAttributes(...attrs: string[]): boolean {
    return attrs.some(attributes =>
      this.getHostElement().hasAttribute(attributes)
    );
  }

  _hasRightIcon: boolean = this.hasHostAttributes('swRightIconInput');
}

//Directives
@Directive({
  selector: 'sw-input[swRightIconInput]'
})
export class RightIconInputCssStylerDirective {
  @HostBinding('class.sw-input--icon-right') className: Boolean = true;
}

@Directive({
  selector: 'sw-input[swFloatingError]'
})
export class FloatingErrorInputCssStylerDirective {
  @HostBinding('class.sw-input--floating-error') className: Boolean = true;
}