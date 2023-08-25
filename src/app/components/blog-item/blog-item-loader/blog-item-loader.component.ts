
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sw-blog-item-loader',
  templateUrl: './blog-item-loader.component.html',
  styleUrls: ['./blog-item-loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogItemLoaderComponent { }
