import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";

import { Device } from "@models/index";

import { Renderer2 } from "@angular/core";

@Component({
  selector: "header-slider-item",
  templateUrl: "./header-slider-item.component.html",
  styleUrls: ["../../header.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderSliderItemComponent {
  @Input() category: any;
  @Input() apiUrl: any;
  @Input() lastChild: any;
  @Input() device: Device;

  @Output() sliderItemClick = new EventEmitter();

  @ViewChild("itemDropdown") itemDropdown!: ElementRef;

  constructor(private renderer: Renderer2) {}

  DEVICE = Device;

  showCategories($event: any) {
    if (this.device !== this.DEVICE.DESKTOP) {
      this.sliderItemClick.emit($event);
    }
  }

  clickedSubcategory() {
    const oldTransition = this.itemDropdown.nativeElement.style.transition;

    this.renderer.setStyle(this.itemDropdown.nativeElement, "max-height", "0px");
    this.renderer.setStyle(this.itemDropdown.nativeElement, "visibility", "hidden");
    this.renderer.setStyle(this.itemDropdown.nativeElement, "transition", "none");

    setTimeout(() => {
      this.renderer.removeStyle(this.itemDropdown.nativeElement, "max-height");
      this.renderer.removeStyle(this.itemDropdown.nativeElement, "visibility");
      this.renderer.removeStyle(this.itemDropdown.nativeElement, "transition");

      this.renderer.setStyle(
        this.itemDropdown.nativeElement,
        "transition",
        oldTransition,
      );
    }, 800);
  }
}
