import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styles: []
})
export class ApplicationsComponent implements OnInit {
  isVisible = false;
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private message: NzMessageService, private modalService: NzModalService) {
    this.validateForm = this.fb.group({
      userName: [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      usage: [''],
      interFace: [],
      remark: []
    });
   }

  ngOnInit() {
    this.updateEditCache();
  }

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
    },
    {
      key    : '6',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key    : '7',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      key    : '8',
      name   : 'Jim Red',
      age    : 32,
      address: 'London No. 2 Lake Park'
    },
    {
      key    : '9',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key    : '10',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      key    : '11',
      name   : 'Jim Red',
      age    : 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  displayData = [ ...this.data ];

  editCache = {};
  startEdit(key: string): void {
    this.editCache[ key ].edit = true;
  }

  startDel(key: string): void {
    this.showDeleteConfirm();
  }

  cancelEdit(key: string): void {
    this.editCache[ key ].edit = false;
  }

  saveEdit(key: string): void {
    const index = this.displayData.findIndex(item => item.key === key);
    Object.assign(this.displayData[ index ], this.editCache[ key ].data);
    // this.dataSet[ index ] = this.editCache[ key ].data;
    this.editCache[ key ].edit = false;

    // success, error, warning
    this.createMessage('success');
  }

  updateEditCache(): void {
    this.displayData.forEach(item => {
      if (!this.editCache[ item.key ]) {
        this.editCache[ item.key ] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk($event, value): void {
    console.log('Button ok clicked!');
    this.isVisible = false;

    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
  }

  userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    setTimeout(() => {
      if (control.value === 'JasonWood') {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  });

  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle     : 'Are you sure delete this task?',
      nzContent   : '<b style="color: red;">Some descriptions</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => console.log('OK'),
      nzCancelText: '取消',
      nzOnCancel  : () => console.log('Cancel')
    });
  }

}
