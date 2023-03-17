import { Component, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
import { CrudServiceService } from 'src/app/servicios/CRUDservices/crud-service.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  users:any= [];
  constructor(private us:UserService,private crudS: CrudServiceService){

  }
  

 insertUser:any;
 insertUsers(name:any,email:any,age:any,phone:any,password:any){
   this.insertUser = {
     "name" : name,
     "email": email,
     "age":  age,
     "phone": phone,
     "password":password,
     "rol_id": 1,
   }

    this.us.registerUser(this.insertUser).subscribe(res=>{
     if(res.creado == "0"){
       alert("falla")
     }else{
       alert("creado correctamente")
      this.crudS.valueEmitter.emit("eventEmitter show users"); 
     }

   })


 }
 
}
