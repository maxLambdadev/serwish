import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';


@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
    
    ]);
  }
}
