import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { DataService } from '@shared/service';
import { AuthRestService } from 'delon-restful';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-add-auth',
  templateUrl: './add-auth.component.html',
  styleUrls: ['./add-auth.component.less'],
})
export class AddAuthComponent implements OnInit {
  i = 1;
  validateForm: FormGroup;
  listOfTagOptions: any[] = [];
  cacheTypeData: any[] = [];
  listOfOption: string[] = [];
  isAddVisible = false;
  dataSet: any[] = [];
  typeData: any[] = [];
  isLoadingOne = false;
  isVisible = false;
  store: any[] = [];
  params = {};
  editCache: any[] = [];
  searchValue: any = '';
  allData: any[] = [];
  displayData: string[] = [];

  public current$ = new Subject<any>();

  constructor(
    private dataService: AuthRestService, private fb: FormBuilder,
    private notification: NzNotificationService) {
  }

  @Output()
  initEmit = new EventEmitter<string>();

  // 新增页面模态框   打开
  showAddModal(): void {
    console.log(this.validateForm);
    this.listOfTagOptions = [];
    this.cacheTypeData = [];
    this.listOfOption = [];
    this.validateForm.reset();
    this.isAddVisible = true;
    this.dataSet = [];
  }
  // 新增页面模态框  取消
  handleCancelAdd(): void {
    this.isAddVisible = false;
  }
  // 新增页面模态框  保存
  addhandleOk(): void {
    // 获取类型的值
    this.typeData = [];
    const newData = this.listOfTagOptions;
    if (newData.length === 0) {
      this.typeData = [];
    } else {
      this.typeData.push({
        name: newData[newData.length - 1]
      });
    }
    this.isLoadingOne = true; // 加载状态
    this.isVisible = false;
    this.dataSet.forEach((item, index) => {
      this.store.push({
        action: item.action,
        describe: item.describe,
        defaultCheck: item.defaultCheck,
      });
    });
    this.params = {
      actions: this.store,
      id: this.validateForm.controls.authID.value,
      name: this.validateForm.controls.authName.value,
      describe: this.validateForm.controls.authRemark.value,
      status: 1,
      parents: [],
      supportDataAccessTypes: [],
      type: 'default',
      optionalFields: this.typeData
    };
    console.log(this.params);
    this.dataService.addAuth(this.params)
    .subscribe(res => {
      // console.log(res);
      if (res && res.status === 200) {
        this.isLoadingOne = false;  // 加载状态
        this.isAddVisible = false; // 模态框消失
        this.getAllData();
        this.createNotification('success', '权限管理', '新增成功！');
      } else {
        this.createNotification('error', '权限管理', '新增失败！');
      }

    }, (error) => {
      this.createNotification('error', '权限管理', '服务器boom!!!');
    });
  }
  createNotification(type: string, title: string, content: string): void {
    this.notification.create(type, title, content);
  }



  // 编辑行
  startEdit(key: string): void {
    console.log(this.editCache);
    this.editCache[key].edit = true;
  }
  // 离开
  cancelEdit(key: string): void {
    this.editCache[key].edit = false;
  }
  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    Object.assign(this.dataSet[index], this.editCache[key].data);
    // this.dataSet[ index ] = this.editCache[ key ].data;
    this.editCache[key].edit = false;
  }
  // 更新修改值
  updateEditCache(): void {
    console.log(this.dataSet);
    this.dataSet.forEach(item => {
      if (!this.editCache[item.key]) {
        this.editCache[item.key] = {
          edit: false,
          data: { ...item }
        };
      }
    });
    console.log(this.dataSet);
  }
  // 新增行
  addRow(): void {
    this.i++;
    this.dataSet = [...this.dataSet, {
      key: `${this.i}`,
      action: ``,
      describe: '',
      defaultCheck: 'true'
    }];
    this.updateEditCache();
  }
  // 删除行
  deleteRow(i: string): void {
    const dataSet = this.dataSet.filter(d => d.key !== i);
    this.dataSet = dataSet;
  }
  // 检测id是否重复
  authIDAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    let re;
    re = /^[A-Za-z0-9]+$/; /*只能是数字或字母，不包括下划线的正则表达式*/
    if (re.test(control.value)) {
      this.current$.next({param: control.value, ob: observer});
    } else {
      observer.next({ error: true, regular: true });
      observer.complete();
    }
  })

  // 获取数据
  getAllData(): void {
    this.initEmit.emit();
  }

  ngOnInit() {
    this.getAllData();
    this.validateForm = this.fb.group({
      authID: [null, [Validators.required], [this.authIDAsyncValidator]],
      authName: [null, [Validators.required]],
      authRemark: [null],
    });
    this.current$.pipe(
      debounceTime(500)// 2000毫秒内不抖动
    ).subscribe(params => {
      this.dataService.checkAuthId(params.param)
      .subscribe(res => {
        if (res.result.length === 0) {
          params.ob.next(null);
        } else {
          params.ob.next({ error: true, duplicated: true });
        }
        params.ob.complete();
      }, (error) => {
        this.createNotification('error', '权限管理', '服务器boom!!!');
      });
    });
  }

}
