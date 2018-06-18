import { Injectable } from '@angular/core';
import { HttpServerService } from './http-server.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  token: string;
  loggedin = new Subject<boolean>();

  constructor(
    private httpServerService: HttpServerService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  login(username, password) {
    this.httpServerService.login(username, password).subscribe(
      resp => {
        this.token = resp.headers.get('Authorization');
        this.cookieService.set('token', this.token);
        this.loggedin.next(true);
      },
      error => {
        this.loggedin.next(false);
        console.log('error', error);
      }
    );
  }

  isAuthentificated() {
    console.log('cookie test:', this.cookieService.get('token'));
    console.log('check test : ', this.cookieService.check('token'));
    const promise = new Promise((resolve, reject) => {
      this.httpServerService.loginTest().subscribe(
        resp => {
          console.log('response : ', resp);
          resolve(true);
        },
        error => {
          resolve(false);
          console.log('error', error);
        }
      );
    });
    return promise;
  }

  logOut() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }


}
