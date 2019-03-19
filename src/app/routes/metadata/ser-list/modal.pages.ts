import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
  } from '@angular/forms';
  import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-ser-list-modal',
  templateUrl: './modal.pages.html',
  styles: [`
  [nz-form] {
    max-width: 600px;
  }
`]
})
export class SerListModalComponent implements OnInit {
  @Input() isVisible: boolean;
  @Output() onModalClosed = new EventEmitter();

  validateForm: FormGroup;
  listOfOption = [];

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
        userName: [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
        usage: [''],
        interFace: [],
        address: [],
        remark: []
      });
   }

  ngOnInit() {
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }

  handleOk($event, value): void {
    this.isVisible = false;
    this.onModalClosed.emit();
    
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
    console.log(value);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.onModalClosed.emit();
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

}