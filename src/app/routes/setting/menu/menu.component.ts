import {Component, OnInit} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd';
import {SFSchema} from '@delon/form';
import {STColumn} from '@delon/abc';
import { MenuRestService } from 'delon-restful';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent implements OnInit {
  isVisible = false;
  params: any = {};
  parentId: string;
  selfId: string;
  type: string;
  schema: SFSchema = {};
  isSpinning: boolean = false;

  users: any[];
  columns: STColumn[] = [
    {title: '菜单名称', index: 'name'},
    {title: '菜单URL', index: 'url'},
    {
      title: '菜单状态',
      index: 'status',
      format: (item: any) => `${item.status ? '开启' : '关闭'}`
    },
    {title: '排序序号', index: 'sortIndex'},
    {
      title: '操作',
      buttons: [
        {
          text: '新增',
          icon: 'plus',
          click: (record: any) => {
            this.showModal(record, 'add');
          }
        },
        {
          text: '编辑',
          icon: 'edit',
          click: (record: any) => {
            this.showModal(record, 'edit');
          }
        },
        {
          text: '删除',
          icon: 'delete',
          type: 'del',
          click: (record) => {
            this.deleteMenuById(record.id);
          }
        },
      ]
    }
  ];

  constructor(
    private notification: NzNotificationService,
    private menuRest: MenuRestService
  ) {
  }

  ngOnInit() {
    this.initMenuList();
    this.params = {
      name: null,
      url: null,
      sort: 0,
      status: '1'
    };
    this.initFormData();
  }

  initMenuList() {
    this.menuRest.getByPage().subscribe(res => {
      if (res && res.result) {
        this.users = res.result;
      } else {
        this.createNotification('info', '菜单列表', '请求数据为空!');
      }
    }, (error) => {
      this.createNotification('error', '菜单列表', '服务器boom!!!');
    })
  }

  initFormData() {
    this.schema = {
      properties: {
        name: {
          type: 'string',
          title: '菜单名称',
          ui: {
            placeholder: '请输入菜单名称'
          },
        },
        url: {
          type: 'string',
          title: '菜单URL',
          ui: {
            placeholder: '请输入菜单URL'
          },
        },
        sort: {
          type: 'number',
          title: '排序序号',
          minimum: 0,
          maximum: 1000
        },
        status: {
          type: 'string',
          title: '菜单状态',
          enum: [
            {label: '开启', value: '1'},
            {label: '关闭', value: '0'}
          ],
          ui: {
            widget: 'select'
          }
        },
      },
      required: ['name', 'url', 'sort']
    };
  }

  createNotification(type: string, title: string, content: string): void {
    this.notification.create(type, title, content);
  }

  showModal(rowData: any, type: string): void {
    // 根节点，parentId取-1，否则取自身
    if (rowData.parentId === -2) {
      this.parentId = '-1';
    } else {
      this.parentId = rowData.id;
    }
    this.selfId = rowData.id;
    this.type = type;
    this.isVisible = true;

    if ('edit' === type) {
      this.menuRest.getById(rowData.id).subscribe(res => {
        if (res && res.status === 200) {
          this.params = {
            name: res.result.name,
            url: res.result.url,
            sort: res.result.sortIndex,
            status: '' + res.result.status
          };
        } else {
          this.createNotification('info', '菜单列表', '查询菜单失败！');
        }
      }, (error) => {
        this.createNotification('error', '菜单列表', '服务器boom!!!');
      })
    }
  }

  handleOk(value: any): void {
    let params = {
      parentId: this.parentId,
      id: this.selfId,
      name: value.name,
      sortIndex: value.sort,
      status: value.status,
      url: value.url
    };

    if ('add' === this.type) {
      this.isSpinning = true;
      params.id = null;
      this.menuRest.save(params).subscribe(res => {
        this.isSpinning = false;
        if (res && res.status === 200) {
          this.initMenuList();
          this.createNotification('success', '菜单列表', '新增菜单成功！');
        } else {
          this.createNotification('info', '菜单列表', '新增菜单失败！');
        }
      }, (error) => {
        this.isSpinning = false;
        this.createNotification('error', '菜单列表', '服务器boom!!!');
      })
    } else if ('edit' === this.type) {
      this.isSpinning = true;
      params.parentId = null;
      this.menuRest.update(params).subscribe(res => {
        this.isSpinning = false;
        if (res && res.status === 200) {
          this.initMenuList();
          this.createNotification('success', '菜单列表', '更新菜单成功！');
        } else {
          this.createNotification('info', '菜单列表', '更新菜单失败！');
        }
      }, (error) => {
        this.isSpinning = false;
        this.createNotification('error', '菜单列表', '服务器boom!!!');
      })
    }

    this.isVisible = false;
    this.params = {
      name: null,
      url: null,
      sort: 0,
      status: '1'
    };
  }

  handleCancel(): void {
    this.isVisible = false;
    this.params = {
      name: null,
      url: null,
      sort: 0,
      status: '1'
    };
  }

  deleteMenuById(id: string) {
    this.isSpinning = true;
    this.menuRest.delById(id).subscribe(res => {
      this.isSpinning = false;
      if (res && res.status === 200) {
        this.initMenuList();
        this.createNotification('success', '菜单列表', '删除菜单成功！');
      } else {
        this.createNotification('info', '菜单列表', '删除菜单失败！');
      }
    },error=>{
      this.isSpinning = false;
      this.createNotification('error', '菜单列表', '服务器boom!!!');
    })
  }

  startEdit(data: any): void {
    this.showModal(data, 'edit');
  }

  deleteRow(data: any): void {
    this.deleteMenuById(data.id);
  }

  // 新增父级菜单
  addMenu() {
    this.showModal({parentId: -2, id: 0}, 'add');
  }

}
