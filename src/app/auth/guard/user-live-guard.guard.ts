import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/servicios/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserLiveGuardGuard implements CanActivate {
  constructor(private router: Router , private us: UserService,private route: ActivatedRoute, ){
      
  }
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      const requestedUser = route.paramMap.get('user');
      const currentUserName = this.us.getCurrentUserName();
  
      const currentUser = this.us.getCurrentUser();
  
      if (!currentUserName || currentUserName.username !== requestedUser) {
        this.router.navigate(['/dashboard/live/'+currentUserName.username]);
        return false;
      }
      
      return true;
  }
  
}
