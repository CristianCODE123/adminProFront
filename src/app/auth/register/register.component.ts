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
  errEmail = false;
  errUsername = false;
  errPassword = false;
  errName = false;

  insertUser:any;
  insertUsers(name:any,username:any,email:any,age:any,phone:any,password:any){
    this.errEmail = false;
    this.errUsername = false;
    this.errPassword = false;
    this.errName = false;
    this.insertUser = {
      "name" : name,
      "email": email,
      "age":  age,
      "phone": phone,
      "password":password,
      "username": username
    }
     this.us.registerUser(this.insertUser).subscribe(res=>{
      console.log(res)
      if (typeof res.email !== 'undefined' && res.email != null) {
        // La variable existe y no es nula
          this.errEmail = true;
          alert("error")
      }else{
        this.errEmail = false;
      }
       if(typeof res.name !== 'undefined' && res.name != null){
        this.errName = true;
        

      }else{
        this.errName = false;
      }
       if(typeof res.password !== 'undefined' && res.password != null){
        this.errPassword = true;

      }else{
        this.errPassword = false;
      }
       if(typeof res.username !== 'undefined' && res.username != null){
        this.errUsername = true;

      }else {
        // La variable no existe o es nula
        alert("bien")
      }

    
    })
  }
}
