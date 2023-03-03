import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthBridgeService {

  constructor() { }
  @Output() user = new EventEmitter<string>();
 


}
