import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = "http://localhost:8000"
  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers : new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  authLogin(credentials:any){
    return this.http.post<any>(this.url+'/api/auth/login',credentials,this.httpOptions)
  }

  listArticle(){
    return this.http.get<any>(this.url+'/api/usuario');
  }
  registerUser(user:any): Observable<any>{
    return this.http.post<any>(this.url+'/api/usuario',user,this.httpOptions)
  }
  deleteUser(id:any): Observable<any>{
    return this.http.delete<any>(this.url+'/api/usuario/'+id,this.httpOptions)
  }
  editUser(id:any, user:any){
    return this.http.put<any>(this.url+'/api/usuario/'+id,user,this.httpOptions)
  }
  getIndicators(){
    return this.http.get<any>(this.url+'/api/indicators',this.httpOptions)
  }
}
