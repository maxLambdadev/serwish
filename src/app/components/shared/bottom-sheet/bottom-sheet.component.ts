import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { OverFlowService } from '@services/overflow.service';

import { SWFadeInAnimation, SWSlideInOutAnimation } from '@animations/index';
@Component({
  selector: 'sw-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    SWFadeInAnimation,
    SWSlideInOutAnimation
  ],
})
export class BottomSheetComponent implements AfterViewInit, OnDestroy {

  @Input() title: string;
  @Input() hasCustomHeader: boolean = false;

  @Output() bottomSheetClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() bottomSheetSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() hasSubmit: boolean = false;

  @Input() hasChange: boolean = false;

  constructor(
    private overFlowService: OverFlowService
  ) {
  }

  ngAfterViewInit(): void {
    this.overFlowService.hide();
  }

  onBottomSheetClose(): void {
    this.bottomSheetClose.emit();
    this.overFlowService.show();
  }

  onBottomSheetSubmit(): void {
    this.bottomSheetSubmit.emit();
    this.overFlowService.show();
  }

  onPanDown(_$event: any): void {
    this.bottomSheetClose.emit();
    this.overFlowService.show();
  }

  ngOnDestroy(): void {
    this.overFlowService.show();
  }

}



