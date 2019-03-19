import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from '@shared/shared.module';
import { KeymanagementRoutingModule } from './keymanagement-routing.module';

import { MykeyComponent } from './mykey/mykey.component';
import { DatasyncComponent } from './datasync/datasync.component';
import { RecycleComponent } from './recycle/recycle.component';
import { GroupModalComponent } from './mykey/groupModal.pages';
import { KeyModalComponent } from './mykey/keyModal.pages';
import { StatisticalComponent } from './datasync/statistical.component';

const coms = [
  MykeyComponent,
  DatasyncComponent,
  RecycleComponent,
  GroupModalComponent,
  KeyModalComponent,
  StatisticalComponent
]

@NgModule({
  imports: [
    CommonModule,
    KeymanagementRoutingModule,
    NgZorroAntdModule.forRoot(),
    SharedModule
  ],
  declarations: [ ...coms ]
})
export class KeymanagementModule { }
