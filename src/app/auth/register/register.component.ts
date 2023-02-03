import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  ngOnInit():void{
    console.log("hi")
  }  
  
  constructor(private us:UserService){}
  
  insertUser:any;
  insertUsers(name:any,email:any,password:any){
    this.insertUser = {
      "name" : name,
      "email": email,
      "password":password
    }
     this.us.registerUser(this.insertUser).subscribe(res=>{
      console.log(res)
    })
  }
}
