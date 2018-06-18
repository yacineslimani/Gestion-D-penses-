import { Component, OnInit } from '@angular/core';
import { User } from '../domain/user';
import { HttpServerService } from '../service/http-server.service';
import { Subscriber } from 'rxjs/Subscriber';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  users: User[];

  constructor(
    private httpServerService: HttpServerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('je suis la ');
    this.getAllUsers();
  }

  getAllUsers() {
    this.httpServerService.getAllUsers().subscribe(
      response => {
        this.users = response;
      },
      error => {
        console.log('error', error);
        if (error.status === 403) {
          this.authService.logOut();
        }
      }
    );
  }
}
