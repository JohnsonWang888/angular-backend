// module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SettingRoutingModule } from './setting-routing.module';
import { TreeTableModule } from 'primeng/treetable';
import { SharedModule } from '@shared/shared.module';
// component
import { MenuComponent } from './menu/menu.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
// auth
import { AuthComponent } from './auth/auth.component';
import { AddAuthComponent } from './auth/add-auth/add-auth.component';
import { EditAuthComponent } from './auth/edit-auth/edit-auth.component';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    TreeTableModule
  ],
  declarations: [MenuComponent, AuthComponent, RoleComponent, UserComponent, AddAuthComponent, EditAuthComponent]
})
export class SettingModule { }
