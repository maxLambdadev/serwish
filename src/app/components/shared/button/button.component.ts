import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation,
  AfterViewInit,
  ApplicationRef,
  PLATFORM_ID,
  OnDestroy
} from '@angular/core';

import { debounce, filter, first, takeUntil } from 'rxjs/operators';
import { Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

import { interval } from 'rxjs/internal/observable/interval'

@Component({
  selector: 'sw-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class.sw-button') className: Boolean = true;
  @HostBinding('class.sw-button--active') activeClassName: Boolean = false;

  @ViewChild('wavesContainer', { static: false }) wavesContainer!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: number,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private appRef: ApplicationRef,
  ) { }

  private unsubscribe$: Subject<null> = new Subject();

  /**
   * set if button is active or not
   */
  @Input() set active(val: boolean) {
    this.activeClassName = val;
  }

  /**
   * size of button may be 'size-32' , 'size-40' , size-48', 'size-64'
   */
  @Input() size = 'size-48';

  /**
   * input is button disabled or not
   */
  @Input() set disabled(val: boolean) {
    this._disabled = val;
    if (this._disabled) {
      this.renderer.addClass(this.getHostElement(), 'sw-button--disabled');
    } else {
      this.renderer.removeClass(this.getHostElement(), 'sw-button--disabled');
    }
  }

  @Input() isLoading: boolean;

  /**
   * outputs when button is clicked
   */
  @Output() clickAction: EventEmitter<any> = new EventEmitter();

  /**
   * outputs when button is clicked
   */
  @Output() disabledAction: EventEmitter<any> = new EventEmitter();

  _disabled: boolean = false;
  mouseUp: Subject<boolean> = new Subject<boolean>();
  mouseUpDebounced: Observable<any> = new Observable<any>();

  /**
   * host listener which listens click
   */
  @HostListener('click', ['$event']) onButtonClick(_$event: any) {
    // $event.stopPropagation();

    if (this._disabled === true) {
      this.disabledAction.emit();
    } else {
      this.clickAction.emit();
    }
  }

  ngOnInit() {
    this.mouseUp = new Subject<boolean>();

    if (isPlatformBrowser(this.platformId)) {
      this.appRef.isStable
        .pipe(
          filter(val => val),
          first()
        )
        .subscribe(() => {
          this.mouseUpDebounced = this.mouseUp.pipe(
            debounce(() => interval(2000))
          );
        });
    }


    this.mouseUpDebounced.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.subsideStorm();
    });
  }

  ngAfterViewInit(): void {
    if (this.size) {
      this.renderer.addClass(this.getHostElement(), 'sw-button--' + this.size);
    }
  }

  hasHostAttributes(...attrs: string[]) {
    return attrs.some(attributes =>
      this.getHostElement().hasAttribute(attributes)
    );
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.showWave(event);
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp() {
    this.mouseUp.next(true);
  }

  showWave(event: any): void {


    let button = this.elementRef.nativeElement;
    let size = button.offsetWidth;
    let pos = button.getBoundingClientRect();

    let wave = document.createElement('span');

    let x = event.x - pos.left - size / 2;
    let y = event.y - pos.top - size / 2;


    let style =
      'top:' +
      y +
      'px; left: ' +
      x +
      'px; height: ' +
      size +
      'px; width: ' +
      size +
      'px;';

    wave.setAttribute('style', style);

    this.wavesContainer.nativeElement.appendChild(wave);
  }

  subsideStorm() {
    while (this.wavesContainer.nativeElement.firstChild) {
      this.wavesContainer.nativeElement.removeChild(
        this.wavesContainer.nativeElement.firstChild
      );
    }
  }

  getHostElement() {
    return this.elementRef.nativeElement;
  }

  _hasLeftIcon: boolean = this.hasHostAttributes('swLeftIconButton');
  _hasRightIcon: boolean = this.hasHostAttributes('swRightIconButton');
  _onlyIcon: boolean = this.hasHostAttributes('swOnlyIconButton');

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
@Directive({
  selector: 'sw-button[swLeftIconButton]'
})
export class LeftIconButtonCssStylerDirective {
  @HostBinding('class.sw-button--icon-left') className: Boolean = true;
}

@Directive({
  selector: 'sw-button[swRightIconButton]'
})
export class RightIconButtonCssStylerDirective {
  @HostBinding('class.sw-button--icon-right') className: Boolean = true;
}

@Directive({
  selector: 'sw-button[swOnlyIconButton]'
})
export class OnlyIconButtonCssStylerDirective {
  @HostBinding('class.sw-button--icon-only') className: Boolean = true;
}

@Directive({
  selector: 'sw-button[swPrimaryButton]'
})
export class PrimaryButtonCssStylerDirective {
  @HostBinding('class.sw-button--primary') className: Boolean = true;
}

@Directive({
  selector: 'sw-button[swSecondaryButton]'
})
export class SecondaryButtonCssStylerDirective {
  @HostBinding('class.sw-button--secondary') className: Boolean = true;
}

@Directive({
  selector: 'sw-button[swBorderedButton]'
})
export class BorderedButtonCssStylerDirective {
  @HostBinding('class.sw-button--bordered') className: Boolean = true;
}

@Directive({
  selector: 'sw-button[swWhiteButton]'
})
export class WhiteButtonCssStylerDirective {
  @HostBinding('class.sw-button--white') className: Boolean = true;
}


@Directive({
  selector: 'sw-button[swFullWidthButton]'
})
export class FullWidthButtonCssStylerDirective {
  @HostBinding('class.sw-button--width-full') className: Boolean = true;
}