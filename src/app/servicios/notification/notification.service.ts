import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url:string = "http://localhost:8000"
  constructor(private http: HttpClient) { }

 httpOptions = {
    headers : new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  newNotification(message:any): Observable<any>{
    return this.http.post<any>(this.url+'/api/notify/add',message,this.httpOptions)
  }
  getNotification(){
    return this.http.get<any>(this.url+'/api/notify/get',this.httpOptions)
  }
}
