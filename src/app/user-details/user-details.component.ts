import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";
import {Group} from "../models/group.model";
import {User} from "../models/user.model";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userName: string = '';

  user: any;

  allGroups: Group[] = [];

  allPermissions: any;

  constructor(public dataService: DataService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('userName') != null) {
        this.dataService.getUserByName(params.get('userName')).subscribe(user => {
          this.user = user;
        })
      }
    })
    this.dataService.getAllGroups().subscribe(allgroups => {
      this.allGroups = allgroups.filter((group: Group) => !this.user.userInGroups.some((e: {
        id: number;
      }) => e.id === group.id));
    })
    this.dataService.getAllPermissions().subscribe(permissions => {
      this.allPermissions = permissions;
      this.allPermissions = this.allPermissions.filter((per: any) => {
        return !this.user.permissions.find((e: { permission: any; }) => {
          return per.permission == e.permission
        })
      })
    })

  }

  addUserToGroup(userId: number, groupId: number) {
    this.dataService.assignUserToGroup(userId, groupId).subscribe(e => {
      if (this.user && !this.user.userInGroups.some((e: { id: number; }) => e.id === groupId)) {
        this.user.userInGroups.push(this.allGroups.filter(group => group.id == groupId)[0]);
        this.allGroups.splice(this.allGroups.indexOf(this.allGroups.filter(group => group.id == groupId)[0]), 1)
      }
    });
  }

  removeUserFromGroup(userId: number, groupId: number) {
    this.dataService.removeUserFromGroup(userId, groupId).subscribe(e => {
      if (this.user) {
        this.allGroups.push(this.user.userInGroups.filter((group: Group) => group.id == groupId)[0])
        this.user.userInGroups.splice(this.user.userInGroups.indexOf(this.user.userInGroups.filter((group: { id: number; }) => group.id == groupId)[0]), 1);
      }
    });
  }

  assignPermissionToUser(permission: string){
    this.dataService.assignPermissionToUser(this.user.id, permission).subscribe((c) => {
        this.user.permissions.push(this.allPermissions.filter((per: { permission: string; }) => per.permission == permission)[0]);
        this.allPermissions.splice(this.allPermissions.indexOf(this.allPermissions.filter((per: { permission: string; }) => per.permission == permission)[0]), 1)
    });
  }

  removePermissionToUser(permission: string){
    this.dataService.removePermissionFromUser(this.user.id, permission).subscribe((c) => {
      this.allPermissions.push(this.user.permissions.filter((per: { permission: string; }) => per.permission == permission)[0])
        this.user.permissions.splice(this.user.permissions.indexOf(this.user.permissions.filter((per: { permission: string; }) => per.permission == permission)[0]), 1);
    });
  }

}
