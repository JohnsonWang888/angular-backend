import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { DataService } from '@shared/service';
import { AuthRestService } from 'delon-restful';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-edit-auth',
  templateUrl: './edit-auth.component.html',
  styleUrls: ['./edit-auth.component.less'],
})
export class EditAuthComponent implements OnInit {
  configId: string[] = [];
  configName: string[] = [];
  configRemark: string[] = [];
  childdata: any[] = [];
  listOfSelectedValue: string[] = [];
  optionalFields: string[] = [];
  isVisible = false;
  configNameData: any[] = [];
  configForm: FormGroup;
  isLoadingTwo = false;
  x = 1;
  storeConfigData: any[] = [];
  editConfig: any[] = [];

  @Output()
  initEmit = new EventEmitter<string>();


  constructor(private modalService: NzModalService,
    private dataService: AuthRestService, private fb: FormBuilder,
    private notification: NzNotificationService) {
  }

  createNotification(type: string, title: string, content: string): void {
    this.notification.create(type, title, content);
  }

  // 配置页面模态框  打开
  showModal(data): void {
    console.log(data);
    this.configId = data.id;
    this.configName = data.name;
    this.configRemark = data.describe;
    this.childdata = [];
    data.actions.forEach((item, index) => {
      this.x++;
      this.childdata = [...this.childdata, {
        key: `${this.x}`,
        action: item.action,
        describe: item.describe,
        defaultCheck: item.defaultCheck,
      }];
      this.updateEditCacheconfig();
    });
    const optionaData = [];
    this.listOfSelectedValue = [];
    data.optionalFields.forEach((item) => {
      optionaData.push({
        label: item.name,
        value: item.name
      });
      this.listOfSelectedValue.push(item.name);
    });
    this.optionalFields = optionaData;
    console.log(this.optionalFields);
    this.isVisible = true;
  }
  handleCancelconfig(): void {
    this.isVisible = false;
  }
  // 获得修改名称的值
  changeName(authName): void {
    this.configNameData = authName;
  }
  // 配置页面 保存
  confighandleOk(): void {
    console.log(this.configForm);
    this.isLoadingTwo = true;  // 加载状态
    this.storeConfigData = null;
    console.log(this.configName);
    this.isVisible = false;
    const store = [];
    // 处理actions 数据
    this.childdata.forEach((item) => {
      store.push({
        action: item.action,
        describe: item.describe,
        defaultCheck: item.defaultCheck,
      });
    });
    // 处理optionalFields数据
    const newOption = [];
    this.listOfSelectedValue.forEach((item) => {
      newOption.push({
        name: item
      });
    });
    const params = {
      id: this.configId,
      name: this.configForm.controls.configName.value,
      actions: store,
      optionalFields: newOption,
      describe: this.configForm.controls.configRemark.value,
    };
    console.log(params);
    // 修改的数据提交到后台
    this.dataService.updateAuth(this.configId, params).subscribe(res => {
      if (res && res.status === 200) {
        this.isLoadingTwo = false;  // 加载状态
        this.getAllData();
        this.createNotification('success', '权限管理', '修改成功！');
      } else {
        this.createNotification('error', '权限管理', '修改失败！');
      }
    }, (error) => {
      this.createNotification('error', '权限管理', '服务器boom!!!');
    });
  }
  // 新增行
  addRowConfig(): void {
    this.x++;
    this.childdata = [...this.childdata, {
      key: `${this.x}`,
      action: ``,
      describe: '',
      defaultCheck: 'true'
    }];
    this.updateEditCacheconfig();
  }
  // 删除行
  deleteRowConfig(j: string): void {
    const childdata = this.childdata.filter(d => d.key !== j);
    this.childdata = childdata;
  }
  // 编辑行
  startEditconfig(key: string): void {
    this.editConfig[key].edit = true;
    console.log(this.childdata);
  }
  // 离开
  cancelEditconfig(key: string): void {
    this.editConfig[key].edit = false;
  }
  saveEditconfig(key: string): void {
    const index = this.childdata.findIndex(item => item.key === key);
    Object.assign(this.childdata[index], this.editConfig[key].data);
    // this.childdata[ index ] = this.editConfig[ key ].data;
    this.editConfig[key].edit = false;
  }
  // 更新修改值
  updateEditCacheconfig(): void {
    this.childdata.forEach(item => {
      if (!this.editConfig[item.key]) {
        this.editConfig[item.key] = {
          edit: false,
          data: { ...item }
        };
      }
    });
    console.log(this.childdata);
  }

  // 获取数据
  getAllData(): void {
    this.initEmit.emit();
  }
  ngOnInit() {
    this.configForm = this.fb.group({
      configName: [null, [Validators.required]],
      configRemark: [null]
    });

  }

}
