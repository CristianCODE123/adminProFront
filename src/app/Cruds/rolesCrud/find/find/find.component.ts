import { Component } from '@angular/core';
import { CrudServiceService } from 'src/app/servicios/CRUDservices/crud-service.service';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent {
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
}
}