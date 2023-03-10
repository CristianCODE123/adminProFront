import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { PagesComponent } from './pages/pages/pages.component';
import {HttpClientModule} from '@angular/common/http';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { EditComponent } from './Cruds/userCrud/edit/edit.component';
import { CreateComponent } from './Cruds/userCrud/create/create.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FindComponent } from './Cruds/rolesCrud/find/find/find.component';
import { ChatComponent } from './shared/chatStream/chat.component';
import { LivestreamInterfaceComponent } from './liveStreamInterface/livestream-interface/livestream-interface.component';
import { VideoPlayerComponent } from './liveStreamInterface/video-player/video-player.component';
import {CookieService} from 'ngx-cookie-service';
import { InterfazStreamerComponent } from './liveStreamInterface/interfazStreamer/interfaz-streamer.component'; 

import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { RtcLiveStreamComponent } from './liveStreamInterface/rtc-live-stream/rtc-live-stream.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    ProgressComponent,
    PagesComponent,
    UserAdminComponent,
    EditComponent,
    CreateComponent,
    FindComponent,
    ChatComponent,
    LivestreamInterfaceComponent,
    VideoPlayerComponent,
    InterfazStreamerComponent,
    RtcLiveStreamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    MatFormFieldModule, 
    MatInputModule,
    
    ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
