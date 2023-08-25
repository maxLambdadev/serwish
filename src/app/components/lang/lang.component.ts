import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsService } from '@services/settings.service';
import { changeLang } from '@store/router/router.actions';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { SWSlideUpDownAnimation } from '@animations/index';

export enum LangType {
  DROPDOWN = 'dropdown',
  BUTTONS = 'buttons'
}

@Component({
  selector: 'sw-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWSlideUpDownAnimation]
})
export class LangComponent implements OnInit {

  @ViewChild('dropDown', { read: ElementRef })
  dropDown: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: {},
    private settingsService: SettingsService,
    private elementRef: ElementRef,
    private store: Store,
  ) { }


  showDropDown: boolean = false;
  activeLang: string = 'ka';

  @Input() type: LangType = LangType.DROPDOWN;

  LANG_TYPE = LangType;

  private unsubscribe$: Subject<null> = new Subject();

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      this.activeLang = localStorage.getItem('lang');
    }

    this.settingsService.activeLang$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((activeLang) => {
        this.activeLang = activeLang;
      });
  }

  onLangToggle() {
    this.showDropDown = !this.showDropDown;
  }

  changeLang(lang: string) {
    this.settingsService.updateActiveLang(lang);
    this.store.dispatch(changeLang({ lang: lang }));
    this.activeLang = lang;
    this.showDropDown = false;
  }

  getHostElement() {
    return this.elementRef.nativeElement;
  }

  getElmHeight(node: any) {
    const list = ['margin-left', 'margin-right', 'width'];

    const style = window.getComputedStyle(node);
    return list
      .map((k) => parseInt(style.getPropertyValue(k), 10))
      .reduce((prev, cur) => Math.floor(prev + cur));
  }

  @HostListener('document:click', ['$event'])
  handleClickIfOutside(event: any) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.dropDown.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.showDropDown = false;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

}
