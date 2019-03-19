import { Component,Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() isCollapsed: boolean;
  constructor(
    public settings: SettingsService,
    public msgSrv: NzMessageService,
    private router: Router
  ) {}

  openMap = {
    sub1: true,
    sub2: false,
    sub3: false
  };
  readMore(){

    this.router.navigate(['setting/menu']);

  }

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[ key ] = false;
      }
    }
  }
}
