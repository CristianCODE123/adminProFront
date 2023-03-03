import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
import { LiveStreamService } from 'src/app/servicios/livestream/live-stream.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  @ViewChild("remoteVideo")
  remoteVideo!: ElementRef;
      constructor(private us: UserService, private lvs: LiveStreamService ){
      }
      
      users:any;

      ngOnInit():void{
        console.log("hi")
        this.showUsers();

        this.lvs.stream.subscribe(res=>{
          alert("xd")
          console.log("emitiendo tal stream? idk");
          console.log(res)
        })

      }

      showUsers(){
        this.users = this.us.listArticle().subscribe(usuario=>{
          console.log(usuario)
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
