import { Injectable, OnInit } from '@angular/core';
import { Spent } from '../domain/spent';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import { HttpServerService } from './http-server.service';
import { Response } from '@angular/http';
import { AuthService } from './auth.service';


@Injectable()
export class SpentDataService implements OnInit {
  private spents: Spent[] = [];

  spentChange = new Subject<Spent[]>();
  constructor(private httpServerService: HttpServerService, private authService: AuthService) {}

  ngOnInit() {}

  deleteSpent(id) {
    this.httpServerService.deleteSpent(this.spents[id].id).subscribe(
      response => {
        console.log('response : ', response);
      },
      error => {
        console.log('error', error);
        if (error.status === 403) {
          this.authService.logOut();
        }
      }
    );

    this.spents.splice(id, 1);
    this.spentChange.next(this.spents.slice());
  }


  getspentData() {
    console.log('getspent', this.spents);
    this.httpServerService.getAllSpents().subscribe(
      response => {
        console.log('response : ', response);
        this.spents = response;
        this.spentChange.next(this.spents.slice());
      },
      error => {
        console.log('error', error);
        if (error.status === 403) {
          this.authService.logOut();
        }
      }
    );

    return this.spents.slice();
  }

  getSpent(id: number) {
    return this.spents[id];
  }

  addSpent(spent: Spent) {
    this.spents.push(spent);
    this.spentChange.next(this.spents.slice());
    console.log('adspent', this.spents);

    this.httpServerService
      .saveSpent(spent)
      .subscribe(
        (response) => {
          console.log(response);
          this.spentChange.next(this.spents.slice());
        },
        error => {
          console.log('error', error);
          if (error.status === 403) {
            this.authService.logOut();
          }
        }
      );
  }

  updateSpent(id, spent: Spent) {

    this.spents[id] = spent;
    this.spentChange.next(this.spents.slice());

    this.httpServerService.updateSpent(this.spents[id].id, spent).subscribe(
      response => {
        console.log('response'  , response);
        this.spentChange.next(this.spents.slice());
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
