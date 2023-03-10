import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = "http://localhost:8000"
  private username: string | undefined;
  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers : new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }


  authLogin(credentials:any){
    return this.http.post<any>(this.url+'/api/auth/login',credentials,this.httpOptions);

  }
 
  login(email:any, password:any) {
    return this.getUserByEmail(email).pipe(
      switchMap(res => {
         console.log(res)
         let usr = res.user.username;
        console.log("ishere?",usr)
        localStorage.setItem('currentUserName', JSON.stringify({ username: usr}));
        return this.http.post<any>(this.url+'/api/auth/login',{ email, password },this.httpOptions)
      }),
      map(response => {
        if (response && response.access_token) {
          localStorage.setItem('currentUser', JSON.stringify({ email, access_token: response.access_token }));
        }
        return response;
      })
    );
  }
  

  logout() {
    localStorage.removeItem('currentUser');
  }


  getCurrentUserName() {
    const currentUser = localStorage.getItem('currentUserName');
    if (currentUser !== null) {
      return JSON.parse(currentUser);
    }
    return null;
  }

  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) {
      return JSON.parse(currentUser);
    }
    return null;
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

  getUserByEmail(email:any):Observable<any>{
    const url = `${this.url}/api/usuarioEmail?email=${email}`;
    return this.http.get<any>(url, this.httpOptions);
}
  // setStreamStatus($id, ){
  //   return this.http.post<any>(this.ur  )
  // }
}
