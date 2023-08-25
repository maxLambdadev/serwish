import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Optional, Renderer2, Self, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Device } from '@models/index';
import { SWSlideUpDownAnimation } from '@animations/index';


export enum TextAreaSize {
  X_SMALL = 'x-small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  X_LARGE = 'x-large',
}

export enum TextAreaType {
  TITLE_IN = 'title-in',
  TITLE_ABOVE = 'title-above'
}

@Component({
  selector: 'sw-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    SWSlideUpDownAnimation
  ]
})
export class TextAreaComponent implements AfterViewInit, ControlValueAccessor {

  @ViewChild('label', { static: false }) label: ElementRef;

  @HostBinding('class.sw-textarea') className: boolean = true;

  @HostBinding('class.sw-textarea--filled') public get isFilled(): boolean {
    return this.data && this.data.length > 0;
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Self() @Optional() public control: NgControl
  ) {
    this.control && (this.control.valueAccessor = this);
    this.errorMessages.set('required', () => "*ცარიელია!");
  }

  @Input() device: Device;
  @Input() size: TextAreaSize = TextAreaSize.LARGE;
  @Input() type: TextAreaType = TextAreaType.TITLE_IN;
  @Input() labelText: string;

  @Input() showErrors: boolean;

  @Input() maxLength: number;

  @Input() hideLabel: boolean;

  DEVICE = Device;
  TEXTAREA_SIZE = TextAreaSize

  placeholder: string = '';

  ngAfterViewInit(): void {
    if (this.size) {
      this.renderer.addClass(this.getHostElement(), 'sw-textarea--' + this.size);

      if (this.label) {
        this.renderer.addClass(this.label.nativeElement, 'sw-textarea__label__text--' + this.size);
      }
    }
  }

  @Input() placeholderDraft: string;

  @Input() required = false;

  @Input() disabled = false;

  @Input() data: string;

  @Input() autoFocus: boolean;

  private errorMessages = new Map<string, () => string>();

  public onChangeFn = (_: any) => { };

  public onTouchedFn = () => {
    this.placeholder = "";
  };

  public onFocusFn = () => {
    this.placeholder = this.placeholderDraft;
  }

  public onBlurFn = () => {

    if (this.hideLabel) {
      this.placeholder = this.placeholderDraft;
    } else {
      this.placeholder = "";
    }

  };


  public get invalid(): boolean {
    return this.control ? this.control.invalid : false;
  }

  public get showError(): boolean {
    if (!this.control) {
      return false;
    }

    const { dirty, touched } = this.control;

    return this.invalid ? (dirty || touched) : false;
  }

  public get errors(): Array<string> {
    if (!this.control) {
      return [];
    }

    const { errors } = this.control;
    return Object.keys(errors).map(key => this.errorMessages.has(key) ? this.errorMessages.get(key)() : <string>errors[key] || key);
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

  //
  getHostElement() {
    return this.elementRef.nativeElement;
  }

}