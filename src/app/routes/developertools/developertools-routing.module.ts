import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SourceComponent} from "./source/source.component";

const routes: Routes = [
  {
    path: 'source',
    component: SourceComponent,
    data: { title: '数据源管理'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevelopertoolsRoutingModule { }
