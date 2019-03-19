import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-datasync',
  templateUrl: './datasync.component.html',
  styleUrls: ['./datasync.component.less']
})
export class DatasyncComponent implements OnInit {
  validateForm: FormGroup;
  listOfOption = [];
  chartData: any[] = [];
  isShowG2 = false;

  constructor(private fb: FormBuilder, private modalService: NzModalService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      date: [ '' ],
      key: [''],
      browser: [],
      ip: []
    });

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;

    for (let i = 0; i < 20; i += 1) {
      this.chartData.push({
          x: (new Date().getTime()) + (1000 * 60 * 30 * i),
          y1: Math.floor(Math.random() * 100) + 1000,
          y2: Math.floor(Math.random() * 100) + 10,
      });
  }
  }


  resetForm(): void {
    this.validateForm.reset();
  }

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

  selectedIndexChange(number) {
    if(number) {
      this.isShowG2 = true;
    } else {
      this.isShowG2 = false;
    }
  }

}
