

import {
  Component,
  ElementRef,
  Input,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  forwardRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ws-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioComponent),
    multi: true
  }
  ]
})

export class RadioComponent implements ControlValueAccessor, AfterViewInit {
  @Input() groupName: string = '';
  @Input() label: string = '';
  @Input() valueName: string = '';


  @ViewChild('rdbtn') rdbtn: ElementRef;

  private value: string;

  disabled: boolean;

  constructor(private cdr: ChangeDetectorRef) { }

  onChange: any = () => { };
  onTouch: any = () => { };

  onInputChange(_val: any) {
    this.onChange(this.valueName);
    this.cdr.detectChanges();
  }

  writeValue(value: any): void {
    this.value = value;
    this.updateChecked();
    this.cdr.detectChanges();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.cdr.detectChanges();
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.updateChecked();
    this.cdr.detectChanges();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateChecked(): void {
    const checked = this.value == this.valueName;
    if (this.rdbtn) {
      this.rdbtn.nativeElement.checked = checked;
    }

    this.cdr.detectChanges();
  }
}