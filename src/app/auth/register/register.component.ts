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
  insertUsers(name:any,email:any,age:any,phone:any,password:any){
    this.insertUser = {
      "name" : name,
      "email": email,
      "age":  age,
      "phone": phone,
      "password":password
    }
     this.us.registerUser(this.insertUser).subscribe(res=>{
      if(res.creado == "0"){
        alert("falla")
      }else{
        alert("creado correctamente")
      }
    })
  }
}
