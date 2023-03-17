import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
import { LiveStreamService } from 'src/app/servicios/livestream/live-stream.service';
import { SocketService } from 'src/app/servicios/sockets/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  @ViewChild("remoteVideo")
  remoteVideo!: ElementRef;
      constructor(
        private us: UserService, 
        private lvs: LiveStreamService, 
        private ss: SocketService

        ){
      }
      streamList:any;
      users:any;
      async getList(){
        // const streams = await this.ss.getAllStreams();
        // this.streamList =  this.ss.listStreams;
        
        // console.log("ishere=", this.streamList)
        // this.showUsers();

        // this.lvs.stream.subscribe(res=>{
      
        //   console.log(res)
        // })
      }


      conversationNameFc:any;

      async ngOnInit():Promise<void>{
        
        await this.ss.getImgUrl();
        console.log("este es el url"+ " "+this.ss.imageUrl);
        
        console.log("username"+this.us.getCurrentUserName().username)
        this.conversationNameFc = this.us.getCurrentUserName().username;

        
        if(localStorage.getItem('currentStream') == undefined){
          this.ss.finishUser(this.conversationNameFc);
        
            }
        const streams = await this.ss.getAllStreams();
        this.streamList =  this.ss.listStreams;
        console.log("ls  " + localStorage.getItem('currentStream'))
        this.showUsers();

        this.lvs.stream.subscribe(res=>{
      
        })

      }

      showUsers(){
        this.users = this.us.listArticle().subscribe(usuario=>{
        })
      }

  ngAfterViewInit() {
    // if (this.lvs.stream) {
    //   this.lvs.stream.attachToElement(this.remoteVideo.nativeElement);
    // }
  }

      carouselWork(){
        
      }
}
