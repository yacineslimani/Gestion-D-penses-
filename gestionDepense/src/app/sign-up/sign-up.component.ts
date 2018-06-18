import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { HttpServerService } from '../service/http-server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpFrom: FormGroup;
  userExist = false;

  constructor(private authService: AuthService,
              private httpServerService: HttpServerService,
              private router: Router) { }

  ngOnInit() {
    this.signUpFrom = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    this.signUp(this.signUpFrom.value.username, this.signUpFrom.value.password, this.signUpFrom.value.email);
  }

  signUp(userName, password, email) {
    this.httpServerService.signUp(userName, password, email).subscribe(
      response => {
        console.log('signUp response : ', response);
        this.router.navigate(['/login']);
      },
      error => {
        if (error.status === 400) {
          this.userExist = true;
        }
        console.log('error', error);
      }
    );
  }

}
