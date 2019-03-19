import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelonRestfulComponent } from './delon-restful.component';

describe('DelonRestfulComponent', () => {
  let component: DelonRestfulComponent;
  let fixture: ComponentFixture<DelonRestfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelonRestfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelonRestfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
