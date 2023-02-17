import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
      constructor(private us: UserService){

      }
      users:any;

      ngOnInit():void{
        console.log("hi")
        this.showUsers();
      }

      showUsers(){
        this.users = this.us.listArticle().subscribe(usuario=>{
          console.log(usuario)
        })
      }
}
