import { Component, ViewChild ,Input } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() isCollapsed: boolean;
  searchToggleStatus: boolean;

  constructor(public settings: SettingsService) {}

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  } 
  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }
}
