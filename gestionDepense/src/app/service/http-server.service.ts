import { Injectable } from '@angular/core';
import { Spent } from '../domain/spent';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../domain/user';



@Injectable()
export class HttpServerService {

  serverIp = 'http://localhost:8181';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  saveSpent(spent: Spent)  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('Authorization', this.cookieService.get('token'));
   return this.http.post(this.serverIp + '/spent/add', spent, { headers: headers});
  }

  getAllSpents() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('Authorization', this.cookieService.get('token'));
    return this.http.get<Spent[]>(this.serverIp + '/spent/find/all', { headers: headers});
  }

  deleteSpent(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('Authorization', this.cookieService.get('token'));
    return this.http.delete(this.serverIp + '/spent/delete/' + id,  { headers: headers});
  }

  deleteSpentLine(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('Authorization', this.cookieService.get('token'));
    return this.http.delete(this.serverIp + '/spent/delete/spentLine/' + id,  { headers: headers});
  }

  updateSpent(id, spent) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('Authorization', this.cookieService.get('token'));
    return this.http.post(this.serverIp + '/spent/update/' + id, spent, { headers: headers});
  }

  login(username, password) {
    return this.http.post<any>(this.serverIp + '/login', {userName: username, password: password}, {observe: 'response'});
  }

  loginTest() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('Authorization', this.cookieService.get('token'));
    return  this.http.get(this.serverIp + '/users/login/test', { headers: headers, observe: 'response' });
  }

  getAllUsers() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('Authorization', this.cookieService.get('token'));
    return this.http.get<User[]>(this.serverIp + '/users/find/all', { headers: headers});
  }



}
