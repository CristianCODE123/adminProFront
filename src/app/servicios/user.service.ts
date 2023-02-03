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
  listArticle(){
    return this.http.get<any>(this.url+'/api/usuario');
  }
  registerUser(user:any): Observable<any>{
    return this.http.post<any>(this.url+'/api/usuario',user,this.httpOptions)
  }

}
