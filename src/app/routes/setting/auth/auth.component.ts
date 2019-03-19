import { Component, OnInit } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { DataService } from '@shared/service';
import { FormBuilder } from '@angular/forms';
import { AuthRestService } from 'delon-restful';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less'],
})


export class AuthComponent implements OnInit {
  displayData: string[] = [];
  configName: string[] = [];
  listOfOption: string[] = [];
  store: any[] = [];
  allData: any[] = [];
  searchValue: any = '';
  configNameData: any[] = [];
  // 改变搜索框
  onChange(value: any): void {
    this.configNameData = value;
  }
  constructor(private modalService: NzModalService,
    private dataService: AuthRestService, private fb: FormBuilder,
    private notification: NzNotificationService) {
  }
 // 搜索
  search(): void {
    const filterFunc = (item) => {
      return (item.name.indexOf(this.searchValue) !== -1);
    };
    const data = this.allData.filter(item => filterFunc(item));
    this.displayData = data.reverse();
  }

  // ****************************************** 新增 ************************************************
  accept() {
    this.getAllData();
  }

  createNotification(type: string, title: string, content: string): void {
    this.notification.create(type, title, content);
  }
  // 删除提示框
  showDeleteConfirm(id, name): void {
    this.modalService.confirm({
      nzTitle: '确定要删除吗?',
      nzContent: '<b style="color: red;">' + name + '</b>',
      nzOkText: '删除',
      nzOkType: 'danger',
      nzOnOk: () => this.dataService.deleteAuth(id).subscribe(res => {
        if (res.status === 200) {
          this.getAllData();
          this.createNotification('success', '权限管理', '删除成功！');
        } else {
          this.createNotification('error', '权限管理', '删除失败！');
        }
      }, (error) => {
        this.createNotification('error', '权限管理', '服务器boom!!!');
      }),
      nzCancelText: '取消',
      nzOnCancel: () => console.log(id)
    });
  }
  // **************************
  // 获取数据
  getAllData(): void {
    this.dataService.getPermissionData().subscribe(res => {
      console.log(res);
      this.allData = res.result;
      this.displayData = [...this.allData].reverse();
      console.log(this.displayData);
    }, (error) => {
      this.createNotification('error', '权限管理', '服务器boom!!!');
    });
    // 类型初始值
    const children = [];
    this.listOfOption = children;

  }

  ngOnInit() {
    this.getAllData();
  }

}
