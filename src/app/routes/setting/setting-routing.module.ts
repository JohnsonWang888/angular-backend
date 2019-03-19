import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { AuthComponent } from './auth/auth.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent,
    data: { title: '菜单管理'}
  },
  {
    path: 'auth',
    component: AuthComponent,
    data: { title: '权限管理'}
  },
  {
    path: 'role',
    component: RoleComponent,
    data: { title: '角色管理'}
  },
  {
    path: 'user',
    component: UserComponent,
    data: { title: '用户管理'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
