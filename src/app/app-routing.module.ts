import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './Cruds/userCrud/edit/edit.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages/pages.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
const routes: Routes = [
  {path: '', 
  component: PagesComponent,
  children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'progress', component: ProgressComponent},
    {path: '', redirectTo: '/dashboard',pathMatch:'full'},
    {path: 'dashboard/userAdmin', component: UserAdminComponent,children: [
      {
        path: 'edit/:id',
        component: EditComponent,
        pathMatch: 'full'
      }
    ] },

  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  //
  {path: '**', component: NopagefoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
