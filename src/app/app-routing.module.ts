import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {GroupComponent} from "./group/group.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {PermissionComponent} from "./permission/permission.component";

const routes: Routes = [
  {path: 'users', component: UserComponent},
  {path: 'users-groups', component: GroupComponent},
  {path: 'user-profile', component: UserDetailsComponent},
  {path: 'permission', component: PermissionComponent},
  {path: '', redirectTo: 'users', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
