import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { UserService } from '../servicios/user.service';
import { RolesService } from '../servicios/roles/roles.service';
import { Router } from '@angular/router';
import { CrudServiceService } from '../servicios/CRUDservices/crud-service.service';
@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent {
  @ViewChild('parentDiv', { static: true }) parentDiv: ElementRef = new ElementRef(null);
  paginaActual = 1;
  users:any = [];
  idDelete:any;
  usuario:any;
  columnaColapsada = false;

  constructor(
    private us: UserService,
    private crudS: CrudServiceService,
    private rs: RolesService,
    ){

  }

 findAllRoles(){
  // this.rs.
 }
  collapseRow(){
    this.columnaColapsada = true
    this.filaEditada = [];
    this.filaEditada.email = "";
    console.log("XD")
  }

  ngOnInit():void{

    
    this.indicatorsPerRole()
    this.crudS.closeRow.subscribe(res=>{
      this.collapseRow();
           
    
    })
    this.crudS.valueEmitter.subscribe(res=>{
      this.showUsers();
    })

    
    this.showUsers();

  }

  sendIdToDelete(id:any){
    this.idDelete = id;
  }
  deleteUser(){
    // const id = this.route.snapshot.paramMap.get('id');    
    this.us.deleteUser(this.idDelete).subscribe(res=>{
      console.log("eliminando....")
      console.log(res)
      this.showUsers();

    })

  }
  filaEditada:any;

  onEditar(Usuario:any){
    this.filaEditada = Usuario;
    console.log(123,this.filaEditada)
  }
  showUsers(){
     this.us.listArticle().subscribe(usuario=>{
      console.log(usuario)
      let i = 0;
      usuario.forEach((element:any) => {
        i++;
        this.users[i] = element
      });
      this.users = usuario;
      console.log(123,this.users)
    })
  }
  indicators:any;
  totalUsers:number = 0;
  indicatorsPerRole(){
    this.us.getIndicators().subscribe(res=>{
      console.log(res)
      this.indicators = res;

      this.indicators.forEach((element:any) => {
        this.totalUsers +=  element.count;
     });
    })
  }

  // deleteUser(){
   
  //   this.router.navigate([`userAdmin/delete/${this.idDelete}`])
  // }
}
