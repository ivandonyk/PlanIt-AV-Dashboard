import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private returnUrl: string;
  public loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {

    if (sessionStorage.getItem('token') !== null) {
      this.router.navigate(['/home/dashboard']);
    } else {
      // this.authService.logout();

    }

    this.loginForm = this.fb.group({
      userName : new FormControl(''),
      password : new FormControl(''),

    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  get f() { return this.loginForm.controls; }



  onSubmit() {
    this.authService.login(this.f.userName.value, this.f.password.value)
      .subscribe(user => {

        if (user && user.access_token) {


          const expirationDate = new Date(new Date().getTime() + (user.expires_in * 1000));
          const duration = expirationDate.toISOString();
          window.sessionStorage.setItem('expires_in', String(user.expires_in));
          window.sessionStorage.setItem('expire', duration);
          window.sessionStorage.setItem('token', user.access_token);
          this.authService.getUserData(this.f.userName.value)
            .subscribe(data => {
              window.sessionStorage.setItem('currentUser', JSON.stringify(data));

              if (this.returnUrl !== '/') {
                this.router.navigate([this.returnUrl]);
              } else {
                this.router.navigate(['/home/dashboard']);
              }
            }, error => {
              console.log(error);
            });
        }
      }, error => {
        console.log(error.status);
        if (error.status) {
          this.snackbar.open('Login failed: Invalid username or password', '', {
              duration: 3500,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            }
          );
        }
      });

  }

}
