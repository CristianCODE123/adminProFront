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
import { LivestreamInterfaceComponent } from './liveStreamInterface/livestream-interface/livestream-interface.component';
import { VideoPlayerComponent } from './liveStreamInterface/video-player/video-player.component';
import { RtcLiveStreamComponent } from './liveStreamInterface/rtc-live-stream/rtc-live-stream.component';
import { AuthGuardGuard } from './auth/guard/auth-guard.guard';
import { UserLiveGuardGuard } from './auth/guard/user-live-guard.guard';
import { RouteWithUserNameGuard } from './auth/guard/route-with-user-name.guard';
//hacer que funcione el guard para salvar las rutas
const routes: Routes = [
  {path: '', 
  component: PagesComponent,
  children: [
    {path: 'dashboard/live/:user', component: RtcLiveStreamComponent, canActivate: [AuthGuardGuard,UserLiveGuardGuard]},
    {path: 'dashboard/init/:user', component: DashboardComponent , canActivate: [AuthGuardGuard]},
    {path: 'dashboard/livertc',component: RtcLiveStreamComponent , canActivate: [AuthGuardGuard]},
    {path: 'progress', component: ProgressComponent , canActivate: [AuthGuardGuard]},
    {path: '', redirectTo: '/dashboard/init/',pathMatch:'full' },
    {path: 'dashboard/userAdmin', component: UserAdminComponent,children: [
      {
        path: 'edit/:id',
        component: EditComponent,
        pathMatch: 'full', canActivate: [AuthGuardGuard]
      }
    ] },

  ]},
  { path: 'data', component: VideoPlayerComponent, pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  //
  {path: '**', component: NopagefoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
