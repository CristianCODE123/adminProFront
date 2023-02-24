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
const routes: Routes = [
  {path: '', 
  component: PagesComponent,
  children: [
    {path: 'dashboard/live/:user', component: RtcLiveStreamComponent},
    {path: 'dashboard/init/:user', component: DashboardComponent},
    {path: 'dashboard/livertc',component: RtcLiveStreamComponent},
    {path: 'progress', component: ProgressComponent},
    {path: '', redirectTo: '/dashboard/init/HOME',pathMatch:'full'},
    {path: 'dashboard/userAdmin', component: UserAdminComponent,children: [
      {
        path: 'edit/:id',
        component: EditComponent,
        pathMatch: 'full'
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
