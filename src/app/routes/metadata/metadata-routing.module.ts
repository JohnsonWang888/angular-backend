import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterfaceComponent } from './interface/interface.component';
import { SerListComponent } from './ser-list/ser-list.component';
import { PlatformComponent } from './platform/platform.component';
import { ApplicationsComponent } from './applications/applications.component';

const routes: Routes = [
  {
    path: 'interface',
    component: InterfaceComponent,
    data: { title: '接口管理'}
  },
  {
    path: 'ser-list',
    component: SerListComponent,
    data: { title: '服务列表'}
  },
  {
    path: 'platform',
    component: PlatformComponent,
    data: { title: '服务平台'}
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
    data: { title: '应用类型'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadataRoutingModule { }
