import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/servicios/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  url:string = "http://localhost:8000"
  constructor(private http: HttpClient, private us: UserService) { }
  
  httpOptions = {
    headers : new HttpHeaders({
      'Content-type': 'application/json'
    })
  }



  login(email:any, password:any) {
    const credentials = {
      email: email,
      password: password
    };
    console.log(credentials,333)
    this.us.authLogin(credentials).subscribe(res=>{
        console.log(454,res)
    });
    return
    this.http.post('http://tu-backend.com/login', credentials)
      .subscribe(
        (response: any) => {
          console.log(response)
          // Almacena el token JWT en el almacenamiento local del navegador
          localStorage.setItem('access_token', response.access_token);
          // Redirige al usuario a la página principal de la aplicación
          //this.router.navigate(['/']);
        },
        (error) => {
          // Maneja los errores de autenticación aquí
        }
      );
  }


}
