import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-permission',
  templateUrl: `./permission.component.html`
})
export class PermissionComponent implements OnInit{
  permissionName: string = '';
  permissions: string[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getAllPermissions().subscribe(permissions => {
      permissions.forEach((permission: { permission: string; }) => this.permissions.push(permission.permission));
    })
  }

  addPermission() {

    this.dataService.createPermission(this.permissionName).subscribe(permission => {
      if (!this.permissions.includes(this.permissionName)) {
        this.permissions.push(this.permissionName);
      }
      this.permissionName = '';
    })
  }



// ... Methods to assign and remove permissions
}
