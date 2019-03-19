import { Injectable } from '@angular/core';
import { BaseUrl, BaseApi, GET, Query, Path, DELETE, POST, PUT, Body } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
@BaseUrl('gis-map-backend')
export class MenuRestService extends BaseApi {
  // @GET('/api/menu/group?sorts[0].name=sortIndex')
  // getByPage(@Query('offset') offset: number, @Query('size') size: number): Observable<any> {
  //   return;
  // }
  @GET('/api/menu/group?sorts[0].name=sortIndex')
  getByPage(): Observable<any> {
    return;
  }
  
  @GET('/api/menu/:id')
  getById(@Path('id') id: string): Observable<any> {
    return;
  }
  
  @DELETE('/menu/:id')
  delById(@Path('id') id: string): Observable<any> {
    return;
  }

  @POST('/menu')
  save(@Body data: Object): Observable<any> {
    return;
  }

  @PUT('/api/menu')
  update(@Body data: Object): Observable<any> {
    return;
  }
}