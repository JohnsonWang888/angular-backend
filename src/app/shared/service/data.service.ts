import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable()
export class DataService {

  constructor(public http: _HttpClient) {}

  // 用户登陆
  doLogin(params: any): any {
    return this.http.post('gis-map-backend/authorize/login', params);
  }

  // 权限管理
  getPermissionData(): any {
    return this.http.get('gis-map-backend/permission/no-paging');
  }

  // 权限管理-新增
  addAuth(params: any): any {
    return this.http.post('gis-map-backend/permission', params);
  }
  // 权限管理-删除
  deleteAuth(id: string): any {
    return this.http.delete('gis-map-backend/permission/' + `${id}`);
  }


  // 权限管理-检测id
  checkAuthId(id: string): any {
    return this.http.get('gis-map-backend/permission/ids?ids=' + `${id}`);
  }

  // 权限管理-根据id修改菜单
  updateAuth(id: any, params: any): any {
    return this.http.put('gis-map-backend/permission/' + `${id}`, params);
  }

  // 菜单管理-获取全部菜单信息
  getMenuList(): any {
    return this.http.get('gis-map-backend/api/menu/group?sorts[0].name=sortIndex');
  }

  // 菜单管理-获取菜单信息
  getMenuById(id: string): any {
    return this.http.get('gis-map-backend/api/menu' + `/${id}`);
  }

  // 菜单管理-新增菜单
  addMenu(params: any): any {
    return this.http.post('gis-map-backend/menu', params);
  }

  // 菜单管理-根据id删除菜单
  deleteMenuById(id: string): any {
    return this.http.delete('gis-map-backend/menu' + `/${id}`);
  }

  // 菜单管理-根据id修改菜单
  updateMenu(params: any): any {
    return this.http.put('gis-map-backend/api/menu', params);
  }


  // 用戶管理-获取全部用户信息
  getGroup(): any {
    return this.http.get('gis-map-backend/api/menu/group');
  }

  // 用戶管理-获取菜单全部用戶信息

  getUserData(): any {
    return this.http.get('gis-map-backend/user/no-paging');
  }


  // 用户管理-获得一已选中菜单状态
  selectListById(id: any): any {
    return this.http.get(`gis-map-backend/autz-setting/user/${id}`);
  }


  // 用户管理-获得权限管理全部数据

  EmpowermentAll(): any {
    return this.http.get(`gis-map-backend/permission/no-paging`);
  }

  // 用户管理-获得角色信息
  // roleAll(): any {
  //   return this.http.get(`gis-map-backend/role`);
  // }
  //

  // 用户管理-添加用户
  addRole(params: any): any {
    return this.http.post(`gis-map-backend/user`, params);
  }

  // 用户管理-查询数据
  selectRole(id: any): any {
    return this.http.get(`gis-map-backend/user/${id}`);
  }

  // 用户管理-修改信息
  modify(id: any, params: any): any {
    return this.http.put(`gis-map-backend/user/${id}`, params);
  }

  // 用户管理-发送数据
  sendEmpowerment(id: any, params: any): any {
    return this.http.put(`gis-map-backend/autz-setting/${id}`, params);
  }

  // 用户管理-发送数据
  sendEmpowermentPost(params: any): any {
    return this.http.post(`gis-map-backend/autz-setting/`, params);
  }


  // 角色管理-获取全部用户信息
  getRoleData(): any {
    return this.http.get('gis-map-backend/role/no-paging');
  }

  // 角色管理-添加用户
  addPeople(params: any): any {
    return this.http.post(`gis-map-backend/role`, params);
  }

  // 角色管理-查询数据
  EditRole(id: any): any {
    return this.http.get(`gis-map-backend/role/${id}`);
  }

  // 角色管理-修改信息
  modifyRole(id: any, params: any): any {
    return this.http.put(`gis-map-backend/role/${id}`, params);
  }

  // 角色管理-获得一已选中菜单状态
  selectListByIdRole(id: any): any {
    return this.http.get(`gis-map-backend/autz-setting/role/${id}`);
  }

}
