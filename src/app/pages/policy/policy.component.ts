import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";


@Component({
    selector: 'sw-policy-page',
    templateUrl: './policy.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class PolicyComponent {
}