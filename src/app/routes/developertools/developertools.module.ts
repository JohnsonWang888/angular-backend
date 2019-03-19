import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopertoolsRoutingModule } from './developertools-routing.module';
import { SharedModule } from '@shared/shared.module';

// component
import { SourceComponent } from './source/source.component';

@NgModule({
  imports: [
    CommonModule,
    DevelopertoolsRoutingModule,
    SharedModule
  ],
  declarations: [SourceComponent]
})
export class DevelopertoolsModule { }
