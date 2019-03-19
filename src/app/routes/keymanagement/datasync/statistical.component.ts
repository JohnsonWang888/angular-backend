import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
  } from '@angular/forms';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./datasync.component.less']
})
export class StatisticalComponent implements OnInit {
  @Input() isVisible: boolean;
  @Output() onModalClosed = new EventEmitter();

  validateForm: FormGroup;
  listOfOption = [];
  selectedValue = 'lucy';
  radioValue = 'A';

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
        key: [ '' ],
        date: [''],
        xAixs: [],
        interface: []
      });
   }

  ngOnInit() {
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
  }

}