import { Component,Input,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.model';
import { UserService } from 'src/app/servicios/user.service';
import { CrudServiceService } from 'src/app/servicios/CRUDservices/crud-service.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @Input() user: User | undefined;

  constructor(private us:UserService,
              private cS: CrudServiceService,
              private route: ActivatedRoute,
              private router: Router,){
    
  }
  ngOnInit():void{
    console.log(785,this.user)
  }  

  emitClose(){
    this.cS.closeRow.emit("cerrar Pestaña")
  }

  editUser(name:any,email:any,age:any,phone:any,password:any,role:any,salery:any){
    let id = this.route.snapshot.paramMap.get('id');
    let user = {
      name : name,
      email: email,
      age: age,
      phone: phone,
      password: password,
      rol_id: role,
      salery: salery
    }

      this.us.editUser(this.user!.id,user).subscribe(res=>{
      })
}

  // addRowToTableEdit(){
  //   var tabla = document.getElementById("miTabla");
  //   for (var i = 0; i < tabla.rows.length; i++) {
  //       var nuevaCelda1 = tabla.rows[i].insertCell(2);
  //       nuevaCelda1.innerHTML = "Nuevo dato 1";
  //       var nuevaCelda2 = tabla.rows[i].insertCell(3);
  //       nuevaCelda2.innerHTML = "Nuevo dato 2";
  //   }
  // }
}
