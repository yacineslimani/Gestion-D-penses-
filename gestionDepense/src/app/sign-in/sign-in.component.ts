import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  loginStatus = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });

    this.authService.loggedin.subscribe((statut: boolean) => {
      if (statut) {
        this.router.navigate(['/spent/list']);
      } else {
        this.loginStatus = true;
      }
    });

  }

  onSubmit() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
  }

}
