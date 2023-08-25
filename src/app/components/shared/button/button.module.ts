import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {

  ButtonComponent,
  PrimaryButtonCssStylerDirective,
  SecondaryButtonCssStylerDirective,
  FullWidthButtonCssStylerDirective,
  LeftIconButtonCssStylerDirective,
  RightIconButtonCssStylerDirective,
  OnlyIconButtonCssStylerDirective,
  WhiteButtonCssStylerDirective,
  BorderedButtonCssStylerDirective,
} from './button.component';
import { IconModule } from '../icon/icon.module';

const components = [
  ButtonComponent,
  PrimaryButtonCssStylerDirective,
  SecondaryButtonCssStylerDirective,
  FullWidthButtonCssStylerDirective,
  LeftIconButtonCssStylerDirective,
  RightIconButtonCssStylerDirective,
  OnlyIconButtonCssStylerDirective,
  WhiteButtonCssStylerDirective,
  BorderedButtonCssStylerDirective
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [...components]
})
export class ButtonModule { }
