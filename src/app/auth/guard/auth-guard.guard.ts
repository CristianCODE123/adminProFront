import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, RouterLink, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/servicios/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router , private us: UserService,private route: ActivatedRoute, ){

  }
  canActivate() {
     
    const currentUser = this.us.getCurrentUser();

    if (currentUser && currentUser.access_token) {
      // El usuario está autenticado, permitir el acceso
      return true;
    }

    // El usuario no está autenticado, redirigir al inicio de sesión
    this.router.navigate(['/login']);
    return false;
  }
  
}
