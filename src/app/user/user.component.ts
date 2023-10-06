import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {User} from "../models/user.model";
import {Group} from "../models/group.model";
import {group} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: `./user.component.html`
})
export class UserComponent implements OnInit{
  userName: string = '';

  message: string = '';
  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllUsers().subscribe(users => {
      users.forEach((user: User) => this.dataService.users.push(user))

    })
    this.dataService.getAllGroups().subscribe(groups => {
      groups.forEach((group: Group) => this.dataService.groups.push(group))
    })
  }
  createUser() {
    this.message = '';
    const newUser = new User(Date.now(), this.userName);
    this.dataService.addUser(newUser).subscribe(users => {
      this.dataService.users.push(users)
    }, err => {
      this.message = err.error.detail;
    });
    this.userName = '';
  }
  removeUser(userId: number) {
    this.message = '';
    this.dataService.removeUser(userId).subscribe(() => {
      const index = this.dataService.users.findIndex(u => u.id === userId);
      if (index > -1) {
        this.dataService.users.splice(index, 1);
      }
    }, err => {
      this.message = err.error.detail;
    });
  }


  protected readonly group = group;
}
