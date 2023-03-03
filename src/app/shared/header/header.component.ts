import { Component,OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { UserService } from 'src/app/servicios/user.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/servicios/sockets/socket.service';
import { NotificationService } from 'src/app/servicios/notification/notification.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

constructor(
  private us: UserService, 
  private router: Router , 
  private ss: SocketService,
  private ns: NotificationService
  ){
}
retornoPrueba:any;
notificaciones:any = [];
showNotification = false;

ngAfterViewInit(){
  this.ns.getNotification().subscribe(res=>{
    console.log(res)
    this.notificaciones = res;
   this.notificaciones = this.notificaciones.filter(
    (item:any) =>item.message !== null
   )

   console.log(this.notificaciones)

   const newArray = this.notificaciones.map((element:any) => {
    let time = element.created_at.split("T")[1];
    let timeWithout0 = time.split(".")[0];
    element.created_at = timeWithout0;
    return element;
  });

  this.notificaciones = newArray;


  if(this.notificaciones.length > 0){
    this.showNotification = true;
  }else{
    this.showNotification = false;
  }


  }
  
  )
}
async ngOnInit(): Promise<void> {
  console.log("headers");
  await this.ss.isConnectedNotification();

  const mensaje = await this.ss.getMessage();
  console.log("XD", mensaje);
  let mensajeRes = {
    "message" : mensaje
  }


  this.notificaciones.push(mensajeRes)
  console.log(this.notificaciones);

    this.ns.newNotification(mensajeRes).subscribe(res => {
      console.log(res);
    });
  this.retornoPrueba = mensaje;
}
    



  logOut(){
    this.us.logout();
    this.router.navigate(['/login']);
    console.log(this.us.getCurrentUser())
    this.ns.newNotification("mensaje").subscribe(res => {
      console.log(res);
    });
   }

}
