import { DOCUMENT } from '@angular/common';

import {
    Component,
    ViewEncapsulation,
    Input,
    ElementRef,
    Optional,
    Inject,
    ChangeDetectionStrategy,
    ViewChild,
    HostBinding
} from '@angular/core';


import { IconRegistry } from './icon.registry';

@Component({
    selector: 'sw-icon',
    templateUrl: 'icon.component.html',
    styleUrls: ['./icon.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {

    @HostBinding('class.sw-icon-svg') public get isSVG(): boolean {
        return true;
    }

    @ViewChild('iconImg', { static: false }) iconImg!: ElementRef;

    constructor(
        @Optional() @Inject(DOCUMENT) private document: any,
        private elementRef: ElementRef,
        private registry: IconRegistry
    ) { }

    _iconName: string = '';
    _iconSize: string = '';
    _imgUrl: string = '';

    private svgIcon!: SVGElement;

    renderImage: boolean = false;

    @Input() noWEBP: boolean;

    @Input() noSRCSET: boolean;

    @Input() set iconName(iconName: string) {
        this._iconName = iconName;
        this.renderIcon();
    }

    @Input() set iconSize(iconSize: string) {
        this._iconSize = iconSize;
        this.renderIcon();
    }

    @Input() colored: boolean = false;

    renderIcon(): void {
        if (this.svgIcon) {
            this.elementRef.nativeElement.removeChild(this.svgIcon);
        }

        const svgData = this.registry.icon(this._iconName);
        this.svgIcon = this.svgElementFromString(svgData);
        this.elementRef.nativeElement.appendChild(this.svgIcon);
    }

    //RENDER SVG FROM STRING
    svgElementFromString(content?: string): SVGElement {
        const div = this.document.createElement('DIV');
        div.innerHTML = content;
        const svg =
            div.querySelector('svg') ||
            this.document.createElementNS('http://www.w3.org/2000/svg', 'path');

        svg.classList.add('sw-icon');
        svg.classList.add('sw-icon--' + this._iconSize);


        if (this.colored) {
            svg.classList.add("sw-icon--colored");
        }

        return svg;
    }
}
