import { Injectable } from '@angular/core';
import { BaseUrl, BaseApi, GET, Query, Path, DELETE, POST, PUT, Body } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
@BaseUrl('gis-map-backend')
export class RoleRestService extends BaseApi {

  // 角色管理-查询数据
  @GET('/role/:id')
  editRole(@Path('id') id: string): Observable<any> {
    return;
  }

  // 角色管理-获取全部用户信息
  @GET('/role/no-paging')
  getRoleData(): Observable<any> {
    return;
  }

  // 用戶管理-获取全部用户信息
  @GET('/api/menu/group')
  getGroup(): Observable<any> {
    return;
  }

  // 用户管理-获得权限管理全部数据
  @GET('/permission/no-paging')
  empowermentAll(): Observable<any> {
    return;
  }

  // 角色管理-获得一已选中菜单状态
  @GET('/autz-setting/role/:id')
  selectListByIdRole(@Path('id') id: string): Observable<any> {
    return;
  }

  // 用户管理-发送数据
  @PUT('/autz-setting/:id')
  sendEmpowerment(@Path('id') id: string,@Body data: Object): Observable<any> {
    return;
  }

  // 用户管理-发送数据
  @POST('/autz-setting')
  sendEmpowermentPost(@Body data: Object): Observable<any> {
    return;
  }

  // 角色管理-修改信息
  @PUT('/role/:id')
  modifyRole(@Path('id') id: any,@Body data: Object): Observable<any> {
    return;
  }

  // 角色管理-添加用户
  @POST('/role')
  addPeople(@Body data: Object): Observable<any> {
    return;
  }

}
