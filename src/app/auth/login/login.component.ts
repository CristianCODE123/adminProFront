import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/servicios/user.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  url:string = "http://localhost:8000"
  constructor(private http: HttpClient, 
    private us: UserService, 
    private route:ActivatedRoute,
    private router:Router
    ){ }
  
  httpOptions = {
    headers : new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  userName:any


  login(email:any, password:any) {
    this.us.login(email, password).subscribe(
      (res) => {
        console.log("res",res)
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        const user =  this.userName = this.us.getCurrentUserName().username;
        ; // Aquí suponemos que la respuesta de la API incluye la información del usuario autenticado, incluyendo su nombre de usuario.
        this.router.navigate(['/dashboard/init/Home']); // Actualizamos la ruta con el nombre de usuario y redirigimos al usuario a la página de inicio.
      },

      error => {

      }
      
    );
  }
  

}
