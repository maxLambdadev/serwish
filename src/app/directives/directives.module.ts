import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoFocusDirective } from './autofocus.directive';
import { DeferLoadDirective } from './defer-load';

@NgModule({
  declarations: [
    DeferLoadDirective,
    AutoFocusDirective
  ],
  imports: [CommonModule],
  exports: [DeferLoadDirective, AutoFocusDirective]
})
export class DirectivesModule { }
