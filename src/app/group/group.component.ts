import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Group} from "../models/group.model";
import {User} from "../models/user.model";



@Component({
  selector: 'app-group',
  templateUrl: `./group.component.html`
})
export class GroupComponent implements OnInit{
  groupName: string = '';

  message: string = '';

  ngOnInit(): void {
    this.dataService.getAllGroups().subscribe(groups => {
      groups.forEach((group: Group) => this.dataService.groups.push(group))
    })
  }

  constructor(public dataService: DataService) {
  }

  createGroup() {
    this.message = '';
    const newGroup = new Group(Date.now(), this.groupName);
    this.dataService.addGroup(newGroup).subscribe(group => {
      this.dataService.groups.push(newGroup);
    }, err => {
      this.message = err.error.detail;
    });
    this.groupName = '';

  }

  removeGroup(groupId: number) {
    this.message = '';
    this.dataService.removeGroup(groupId).subscribe(group => {
      const index = this.dataService.groups.findIndex(g => g.id === groupId);
      if (index > -1) {
        this.dataService.groups.splice(index, 1);
      }
    }, err => {
      this.message = err.error.detail;
    });
    this.groupName = '';
  }


}
