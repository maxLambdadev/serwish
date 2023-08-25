

import {
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sw-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }
  ]
})

export class CheckboxComponent implements ControlValueAccessor {

  @Input() label: string;

  @Output() toggleCheckboxClick: EventEmitter<any> = new EventEmitter<any>();

  onChange: any = () => { };
  onTouch: any = () => { };

  @Input() checked: boolean = false;

  disabled: boolean;

  writeValue(checked: any): void {
    this.checked = checked;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onModelChange(_value: boolean) {
    this.toggleCheckboxClick.emit();
    this.checked = !this.checked;
    this.onChange(this.checked);
  }
}