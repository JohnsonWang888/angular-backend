import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-mykey',
  templateUrl: './mykey.component.html',
  styles: []
})
export class MykeyComponent implements OnInit {
  isVisible = false;

  constructor(private modalService: NzModalService) { }

  ngOnInit() {}

  sortName = null;
  sortValue = null;
  listOfSearchName = [];
  searchAddress: string;
  data = [
    {
      key    : '1',
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key    : '2',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key    : '3',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      key    : '4',
      name   : 'Jim Red',
      age    : 32,
      address: 'London No. 2 Lake Park'
    },
    {
      key    : '5',
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park'
    }
  ];
  displayData = [ ...this.data ];

  panels = [
    {
      active    : true,
      name      : 'This is panel header 1',
      disabled  : false,
      data      : this.displayData
    },
    {
      active  : false,
      disabled: false,
      name    : 'This is panel header 2',
      data      : this.displayData
    },
    {
      active  : false,
      disabled: false,
      name    : 'This is panel header 3',
      data      : this.displayData
    }
  ];

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = item => (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) && (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1) : true);
    const data = this.data.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }

  addKey(e, panel) {
    e.stopPropagation();
  }

  editGroup(e, panel) {
    e.stopPropagation();
  }

  delGroup(e, panel) {
    e.stopPropagation();

    this.modalService.confirm({
      nzTitle     : '确定要删除么?',
      nzContent   : '<b style="color: red;">Some descriptions</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => console.log('OK'),
      nzCancelText: '取消',
      nzOnCancel  : () => console.log('Cancel')
    });
  }

  delKey(key) {
    this.modalService.confirm({
      nzTitle     : '确定要删除么?',
      nzContent   : '<b style="color: red;">Some descriptions</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => console.log('OK'),
      nzCancelText: '取消',
      nzOnCancel  : () => console.log('Cancel')
    });
  }

  editKey(key) {

  }

  showModal(): void {
    this.isVisible = true;
  }

  getModalInfo(e: any) {
    this.isVisible = false;
  }

}
