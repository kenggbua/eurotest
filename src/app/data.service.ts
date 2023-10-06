import { Injectable } from '@angular/core';
import {User} from "./models/user.model";
import {Group} from "./models/group.model";
import {HttpClient} from "@angular/common/http";


const API_URL = "http://localhost:8080/users";
const API_URL_GROUPS = "http://localhost:8080/users-groups";
const API_URL_PERMISSIONS = "http://localhost:8080/permissions";

const httpOptions = {
  headers: {'Content-Type': 'application/json'}, responseType: 'json' as 'json'
};
@Injectable({
  providedIn: 'root'
})
export class DataService {
  users: User[] = [];
  groups: Group[] = [];
  permissions: string[] = [];

  constructor(private http: HttpClient) {
  }

  getAllUsers(){
    return this.http.get<any>(API_URL, httpOptions);
  }

  getUserByName(userName: string | null){
    return this.http.get<any>(API_URL + '/' + userName, httpOptions);
  }

  addUser(user: User) {
    return this.http.post<User>(API_URL,
      user
    , httpOptions);
  }

  removeUser(userId: number) {
    return this.http.delete<number>(API_URL + '/' + userId, httpOptions);
  }

  getAllGroups(){
    return this.http.get<any>(API_URL_GROUPS, httpOptions);
  }
  addGroup(group: Group) {
    return this.http.post<Group>(API_URL_GROUPS,
      group
      , httpOptions);
  }

  removeGroup(groupId: number) {
    return this.http.delete<number>(API_URL_GROUPS + '/' + groupId, httpOptions);
  }
  assignUserToGroup(userId: number, groupId: number) {
    return this.http.post<any>(API_URL + '/assign-user-group',{
        userId: userId,
        groupId: groupId
      }
      , httpOptions);
  }
  removeUserFromGroup(userId: number, groupId: number) {
    return this.http.post<any>(API_URL + '/unassign-user-group',{
        userId: userId,
        groupId: groupId
      }
      , httpOptions);
  }
  removePermissionFromUser(userId: number, permission: string) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      const index = user.permissions.indexOf(permission);
      if (index > -1) {
        user.permissions.splice(index, 1);
      }
    }
  }
  assignPermissionToGroup(groupId: number, permission: string) {
    const group = this.groups.find(g => g.id === groupId);
    if (group && !group.permissions.includes(permission)) {
      group.permissions.push(permission);
    }
  }
  removePermissionFromGroup(groupId: number, permission: string) {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      const index = group.permissions.indexOf(permission);
      if (index > -1) {
        group.permissions.splice(index, 1);
      }
    }
  }

  getAllPermissions(){
    return this.http.get<any>(API_URL_PERMISSIONS, httpOptions);
  }

  assignPermissionToUser(userId: number, permission: string) {
    return this.http.post<any>(API_URL_PERMISSIONS, {
      userId,
      permission
    }, httpOptions);
  }

  removePermissionToUser(userId: number, permission: string) {
    console.log(userId)
    console.log(permission)
    return this.http.post<any>(API_URL_PERMISSIONS + '/remove-permission', {
      userId,
      permission
    }, httpOptions);
  }

  createPermission(permission: string){
    return this.http.post<string>(API_URL_PERMISSIONS + '/' + permission,
      permission
      , httpOptions);
  }
// ... Other CRUD operations for users and groups
}
