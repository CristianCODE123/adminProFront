import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, RouterLink, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/servicios/user.service';

@Injectable({
  providedIn: 'root'
})
export class RouteWithUserNameGuard implements CanActivate {
  constructor(private router: Router , private us: UserService,private route: ActivatedRoute, ){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUserName = this.us.getCurrentUserName();

      if (currentUserName.username  !=  "") {
        this.router.navigate(['/dashboard/init/' + currentUserName.username]);
      } else {
        this.router.navigate(['/login' + currentUserName.username]);
      }

    return true;
  }
  
}
