import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'sw-terms',
    templateUrl: './terms.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TermsComponent {


}