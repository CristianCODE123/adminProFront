import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LiveStreamService {
  
  @Output() valueEmitter = new EventEmitter<string>();
  getResponseFromNode(){
    this.http.get('/api/start').subscribe((data) =>{
      console.log("dataNodE?",data)
    })
  }
  constructor(private http: HttpClient) { }
}
