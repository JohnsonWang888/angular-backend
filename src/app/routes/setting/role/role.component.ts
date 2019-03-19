import {Component, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {NzFormatEmitEvent, NzTreeNode} from 'ng-zorro-antd';
// import {DataService} from '@shared/service';
import { RoleRestService } from 'delon-restful';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {SFSchema} from '@delon/form';
import {NzNotificationService} from 'ng-zorro-antd';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less'],
})
export class RoleComponent implements OnInit {

  constructor(private notification: NzNotificationService, ModalService: NzModalService, private UserService: RoleRestService, private fb: FormBuilder) {
  }

  data = [];
  //编辑显示
  editVisible = false;
  //授权显示
  userEmpowermentVisible = false;
  //添加用户
  addEmpowermentVisible = false;

  //搜索
  searchValue = '';

  //菜单
  nodes = [];
  allSelectData = [];

  //权限
  nodesEmpowerment = [];

  //选中的菜单
  menus = [];
  menuses = [];
  AllMenu = [];
  //选中的权限
  details = [];
  detailses = [];
  AllDetail = [];
  //提交数据
  sumbitEmpowermentData = null;
  sumbitMeauData = null;
  //用户ID
  userId = null;
  userIdes = null;
  submitData = {
    "details": [], "menus": [], merge: "true",
    priority: "10",
    settingFor: null,
    type: "role"
  };

  //表单
  schema: SFSchema = {};

  postInfo = {};
  rolesPower = [];
  params = {};

  //是否修改用户信息
  modify = false;

  //是否开启缓存模式
  isSpinning: boolean = false;


  //添加用户
  addEmpowerment(): void {
    this.addEmpowermentVisible = true;
    this.schema.properties.id.readOnly = false;
  };


  //提示是否成功
  createNotification(type: string, title: string, content: string): void {
    this.notification.create(type, title, content);
  }

  //编辑展示
  edit(id): void {
    this.addEmpowermentVisible = true;
    this.schema.properties.id.readOnly = true;

    this.UserService.editRole(id).subscribe(res => {
      // console.log(res);
      this.params = {
        id: res.result.id,
        name: res.result.name,
        describe: res.result.describe
      };

    });

    //修改信息
    this.modify = id;

  };

//搜索
  //搜索结果
  search(): void {
    this.data = this.data.filter(item => {
      return item.name.indexOf(this.searchValue) !== -1
    });
  }

  //重置搜索
  reat(): void {
    this.UserService.getRoleData().subscribe(res => {
      // console.log(res.result.data);
      this.data = res.result;
      this.searchValue = null;
    });
  }


  //用户赋权
  userEmpowerment(data): void {
    this.isSpinning = true;
    //显示二级管理
    this.userEmpowermentVisible = true;
    this.defaultCheckedKeys = [];
    this.menuses = [];
    this.detailses = [];
    this.userId = data;
    //菜单模块
    //获取所有菜单列表
    this.UserService.getGroup().subscribe(res => {
      this.AllMenu = res.result;
      this.nodes = res.result.map(d => {
        let groupList = {
          "title": d.name,
          "key": d.id,
          expanded: false,
          children: []
        };
        d.children.map(result => {
          let ListDetail = {
            title: result.name,
            key: result.id,
            isLeaf: true,
            children: []
          };
          result.children.map(p => {
            let ListDetails = {
              title: p.name,
              key: p.id,
              isLeaf: true,
              children: []
            };
            ListDetail.children.push(ListDetails);
          });
          groupList.children.push(ListDetail);
        });

        return groupList;
      });
      // console.log(this.nodes);
      //获取所有用户列表
      this.UserService.empowermentAll().subscribe(res => {
        this.AllDetail = res.result;
        this.detailses = [];
        this.nodesEmpowerment = res.result.map(d => {
          let groupLists = {
            "title": d.name,
            "key": d.id,
            expanded: false,
            children: []
          };
          d.actions.map(a => {
            let ListDetail = {
              title: a.describe,
              key: d.id + "_" + a.action,
              isLeaf: false,
              children: d.optionalFields.map(t => {
                let ListDetailsChildren = {
                  title: t.name,
                  isLeaf: true,
                  key: d.id + "_" + a.action + "_" + t.name,
                  children: []
                };
                return ListDetailsChildren
              })
            };
            groupLists.children.push(ListDetail);
          });
          return groupLists;
        });
        // console.log('111111', this.nodesEmpowerment);
        // console.log(this.details);
        this.UserService.selectListByIdRole(data).subscribe(res => {
          if (res.result) {
            this.userIdes = res.result.id;
          } else {
            this.userIdes = null;
            this.isSpinning = false;
            return;
          }
          // this.menus=res.result.menus;
          //获取选中的菜单列表
          if (res.result.menus.length > 0) {
            this.menus = this.nodes.map(d => {
              // res.result.menus
              return res.result.menus.map(s => {
                return d.children.filter(r => {
                  if (r.key === s.menuId) {
                    return true;
                  }
                })
              })
            }).map(d => {
              return d.filter(s => {
                return s[0];
              });
            }).map(d => {
              return d.map(s => {
                return s[0].key;
              });
            }).map(d => {
              d.map(s => {
                if (this.menuses.indexOf(s) == -1) {
                  this.menuses.push(s);
                }
              })
            });
            this.defaultCheckedKeys = this.menuses;
            // this.defaultSelectedKeys = this.menuses;
          }


          if (res.result.details.length > 0) {
            res.result.details.map(a => {
              let childrenInfo = [];
              this.nodesEmpowerment.map(b => {
                if (b.key === a.permissionId) {
                  childrenInfo = b.children.filter(z => {
                    return (a.actions.indexOf(z.key.split("_")[1]) !== -1)
                  });
                  this.allSelectData = [];
                  if (a.dataAccesses.length > 0) {
                    a.dataAccesses.map(d => {
                      if (d.type === "DENY_FIELDS") {
                        let config = null;
                        config = JSON.parse(d.config);
                        config.fields.map(e => {
                          this.allSelectData.push(a.permissionId + "_" + d.action + "_" + e);
                        });
                      }
                    });
                    // console.log(this.allSelectData);
                    childrenInfo.map(f => {
                      f.children.map(g => {
                        if (this.allSelectData.indexOf(g.key) === -1) {
                          this.detailses.push(g.key);
                        }
                      })
                    })
                  } else {
                    childrenInfo = b.children.filter(z => {
                      return (a.actions.indexOf(z.key.split("_")[1]) !== -1)
                    });
                    childrenInfo.map(c => {
                      this.detailses.push(c.key);
                    });
                  }


                }
              })
            });
            this.defaultCheckedKeysEmpowerment = this.detailses;
          }

          this.isSpinning = false;
        });

      });


    });


  };

  //点击用户赋权保存和取消修改
  userEmpowermentOk(): void {
    this.submitData = {
      "details": [], "menus": [], merge: "true",
      priority: "10",
      settingFor: this.userId,
      type: "role"
    };
    this.userEmpowermentVisible = false;

    //菜单数据处理
    let selectedKeys;
    if (this.sumbitMeauData) {
      selectedKeys = this.sumbitMeauData.keys;
    } else {
      selectedKeys = this.defaultCheckedKeys;
    }

    let selectedMenus = JSON.parse(JSON.stringify(this.AllMenu));
    for (let i = 0; i < this.AllMenu.length; i++) {
      let menu = this.AllMenu[i];
      let selected = selectedKeys.indexOf(menu.id);
      if (selected < 0) {// 如果有则不用处理，直接保留
        // 进入到节点内部继续判断
        let children = menu.children;
        selectedMenus[i].children = selectedMenus[i].children.filter(child => {
            return selectedKeys.indexOf(child.id) > -1
          }
        );
      }
    }
    selectedMenus = selectedMenus.filter(menu => {
      return menu.children.length > 0
    });

    let allMenus = [];
    this.AllMenu = this.AllMenu.map(d => {
      selectedMenus.map(c => {
        if (c.id === d.id)
          allMenus.push(d);
      })
    });
    for (let q = 0; q < allMenus.length; q++) {
      this.submitData.menus.push({
        children: selectedMenus[q].children.map(c => {
          return {
            children: [],
            icon: c.icon,
            menu: {
              id: c.id,
              level: 0,
              name: c.name,
              parentId: "e9dc96d6b677cbae865670e6813f5e8b",
              path: c.path,
              permissionId: c.permissionId,
              sortIndex: c.sortIndex,
              status: c.status,
              url: c.url,
            },
            menuId: c.id
          }
        }),
        expanded: false,
        icon: allMenus[q].icon,
        menu: {
          children: allMenus[q].children,
          describe: allMenus[q].describe,
          expanded: true,
          icon: allMenus[q].icon,
          id: allMenus[q].id,
          name: allMenus[q].name,
          parentId: allMenus[q].parentId,
          path: allMenus[q].path,
          permissionId: allMenus[q].permissionId,
          sortIndex: allMenus[q].sortIndex,
          status: allMenus[q].status,
          url: allMenus[q].url,

        },
        menuId: allMenus[q].id
      })
    }


    //权限数据处理
    // console.log(this.sumbitEmpowermentData.keys);
    // console.log(this.nodesEmpowerment);
    let Empowermentkey = null;
    if (this.sumbitEmpowermentData) {
      Empowermentkey = this.sumbitEmpowermentData.keys;
    } else {
      Empowermentkey = this.defaultCheckedKeysEmpowerment;
    }
    this.nodesEmpowerment.map(a => {
      let selectInfo = [];
      let dataAccesses = {};
      let saved_denied = [];
      let dataAccessesAgain = [];
      Empowermentkey.map(b => {

        let children_keys = b.split('_');
        if (children_keys[0] === a.key && children_keys.length === 1) {//一级全部被选中，直接添加
          selectInfo = a.children.map(c => {
            return c.key.split("_")[1];
          })
        } else if (children_keys[1] && children_keys[0] === a.key) {
          // 二级全部被选中，直接添加

          if (selectInfo.indexOf(children_keys[1]) < 0) {
            selectInfo.push(children_keys[1]);

          }

          if (!children_keys[2]) {
            //全部选中第二级
          } else {
            let op = children_keys[1];
            saved_denied = dataAccesses[children_keys[0] + "_" + children_keys[1]] || [];
            if (saved_denied.length < 1) {
              saved_denied = a.children
                .filter(child => {
                  return child.key === children_keys[0] + "_" + children_keys[1]
                })[0]
                .children
                .filter(field => {
                  return field.title !== children_keys[2]
                })
                .map(field => field.title);
              dataAccesses[children_keys[0] + "_" + children_keys[1]] = saved_denied;
            } else {
              saved_denied = saved_denied
                .filter(field => {
                  return field !== children_keys[2]
                })
              ;
              dataAccesses[children_keys[0] + "_" + children_keys[1]] = saved_denied;
            }

          }
          // console.log(dataAccesses);
        } else {
          // a.key 不等于任何节点，不操作
        }
      });

      for (let i in dataAccesses) {
        dataAccessesAgain.push({
          action: i.split('_')[1],
          config: JSON.stringify({fields: dataAccesses[i]}),
          describe: "不能操作字段",
          type: "DENY_FIELDS"
        })
      }

      this.submitData.details.push({
        actions: selectInfo,
        dataAccesses: dataAccessesAgain,
        merge: "true",
        permissionId: a.key,
        priority: "10",
      });
    })


    console.log(this.submitData);
    if (this.userIdes) {
      this.UserService.sendEmpowerment(this.userIdes, this.submitData).subscribe(res => {
        if (res.result !== 0) {
          this.createNotification('success', '权限设置', '设置成功!')
        }
      })
    } else {
      this.UserService.sendEmpowermentPost(this.submitData).subscribe(res => {
        if (res.result !== 0) {
          this.createNotification('success', '权限设置', '设置成功!')
        }
      })

    }

  };

  userEmpowermentCancel(): void {
    this.userEmpowermentVisible = false;

  }


  ngOnInit() {
    this.UserService.getRoleData().subscribe(res => {
      // console.log(res.result.data);
      this.data = res.result;
    });
    this.initFormData();





  }

  //初始化动态表单
  initFormData() {

    this.schema = {
      properties: {
        id: {
          type: 'string',
          title: '角色标识(ID):',
          readOnly: false,
          ui: {
            placeholder: '只能由字母数字下划线组成',

          },
        },
        name: {
          type: 'string',
          title: '角色名称',
          ui: {
            placeholder: '请输入角色名称',
            errors: {
              'required': '请输入角色名称'
            }

          },
        },
        describe: {
          type: 'string',
          title: '备注',
          ui: {
            placeholder: '',
            errors: {
              'required': ''
            }

          },
        }
      },
      required: ['name', 'id'],
    };
  }

  //点击确定修改，取消修改
  handleCancel(): void {
    this.addEmpowermentVisible = false;
    this.params = {
      id: null,
      name: null,
      describe: null,
    };
    this.modify = false;
    this.schema.properties.id.readOnly = false;
  }

  handleOk(value: any): void {
    let params = {
      id: value.id,
      name: value.name,
      describe: value.describe
    };

    if (this.modify) {
      this.UserService.modifyRole(this.modify, params).subscribe(res => {
        if (res.status === 200) {
          this.addEmpowermentVisible = false;
          this.createNotification('success', '用户编辑', '修改成功!');
          this.UserService.getRoleData().subscribe(res => {
            // console.log(res.result.data);
            this.data = res.result;
          });
        }
      }, error => {
        this.createNotification('error', '用户编辑', '编辑失败!');
      });
      this.modify = false;
    } else {
      this.UserService.addPeople(params).subscribe(res => {
        if (res) {
          this.addEmpowermentVisible = false;
          this.createNotification('success', '添加角色', '添加成功!');
          this.UserService.getRoleData().subscribe(res => {
            // console.log(res.result.data);
            this.data = res.result;
          });
        }
      }, error => {

        this.createNotification('error', '添加角色', error.error.message);

      });
    }

    this.params = {
      name: null,
      userName: null,
      password: null,
    };

  }


//树形结构
  //菜单管理
  //选择整个节点
  defaultCheckedKeys = this.menus;
  //选择单个节点
  defaultSelectedKeys = this.menus;
  //展开的节点
  defaultExpandedKeys = this.menus;

  nzEvent(event: NzFormatEmitEvent): void {
    // console.log(event);
    this.sumbitMeauData = event;
  }

//权限管理
  defaultCheckedKeysEmpowerment = this.details;
  defaultSelectedKeysEmpowerment = this.details;
  defaultExpandedKeysEmpowerment = this.details;

  nzEventEmpowerment(event: NzFormatEmitEvent): void {
    // console.log(event);
    this.sumbitEmpowermentData = event;
  }

}
