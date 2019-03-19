import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataRoutingModule } from './metadata-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TreeTableModule } from 'primeng/treetable';
import { SharedModule } from '@shared/shared.module';

// components
import { InterfaceComponent } from './interface/interface.component';
import { SerListComponent } from './ser-list/ser-list.component';
import { PlatformComponent } from './platform/platform.component';
import { ApplicationsComponent } from './applications/applications.component';
import { SerListModalComponent } from './ser-list/modal.pages';
import { PlatformModalComponent } from './platform/modal.pages';

const coms = [
  InterfaceComponent,
  SerListComponent,
  PlatformComponent,
  ApplicationsComponent,
  SerListModalComponent,
  PlatformModalComponent
]

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    MetadataRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    TreeTableModule
  ],
  declarations: [ ...coms ]
})
export class MetadataModule { }
