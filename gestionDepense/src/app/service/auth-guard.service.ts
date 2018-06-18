import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { HttpServerService } from './http-server.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private authService: AuthService, private router: Router,
    private httpServerService: HttpServerService, private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    return this.authService.isAuthentificated().then(
      (authentificated: boolean) => {
        if (authentificated) {
          console.log('status : ', status);
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
    );

  }

}
