import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MykeyComponent } from './mykey/mykey.component';
import { DatasyncComponent } from './datasync/datasync.component';
import { RecycleComponent } from './recycle/recycle.component';

const routes: Routes = [
  {
    path: 'mykey',
    component: MykeyComponent,
    data: { title: '我的key'}
  },
  {
    path: 'datasync',
    component: DatasyncComponent,
    data: { title: '数据分析'}
  },
  {
    path: 'recycle',
    component: RecycleComponent,
    data: { title: '回收站'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeymanagementRoutingModule { }
