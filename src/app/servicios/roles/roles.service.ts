import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  url:string = "http://localhost:8000"
  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers : new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  insertNewRol(rol:any){
    return this.http.post<any>(this.url+'/api/roles',rol,this.httpOptions)
  }

  findRoles(){
    return this.http.get<any>(this.url+'/api/roles',this.httpOptions)

  }  
}
