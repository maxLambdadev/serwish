import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRequestComponent } from './service-request.component';
import { ButtonModule } from '@components/shared/button/button.module';
import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { ImageModule } from '@components/shared/image/image.module';
import { swIconNextArrowIcon } from '@icons/ts';
import { InputModule } from '@components/shared/input/input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { RequestServiceService } from '@services/requestService.service';

@NgModule({
  declarations: [
    ServiceRequestComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    ImageModule,
    InputModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [ServiceRequestComponent],
  providers: [RequestServiceService]
})
export class ServiceRequestModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconNextArrowIcon
    ]);
  }
}
