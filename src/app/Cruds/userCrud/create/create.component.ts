import { Component, EventEmitter, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
import { CrudServiceService } from 'src/app/servicios/CRUDservices/crud-service.service';
import { RolesService } from 'src/app/servicios/roles/roles.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  users:any= [];
  constructor(private us:UserService,private crudS: CrudServiceService, private rs: RolesService){

  }
  
  roles:any;
  errPassword:boolean = false;
  errName:boolean = false ;
  errEmail:boolean = false;
  errUsername:boolean = false;
  
  ngOnInit():void{
    this.findAllRoles()
  }

  findAllRoles(){
    this.rs.findRoles().subscribe(res=>{
     this.roles = res; 
     console.log(55,res)
    })
  }
 insertUser:any;
 insertUsers(name:any,email:any,age:any,phone:any,password:any,rol:any,userName:any){
  console.log(rol,"rolll")
   this.insertUser = {
     "name" : name,
     "email": email,
     "age":  age,
     "phone": phone,
     "password":password,
     "rol_id": rol,
     "username":userName
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
        this.errUsername = false;
        // La variable no existe o es nula
        alert("bien")
      }

   })


 }
 
}
