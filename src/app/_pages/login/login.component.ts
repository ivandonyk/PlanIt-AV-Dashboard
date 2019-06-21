import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private returnUrl: string;
  public loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {

    if (sessionStorage.getItem('currentUser') !== null) {
      this.router.navigate(['/home/dashboard']);
    } else {
      this.authService.logout();

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

        if (user && user.token) {


          const expirationDate = new Date(new Date().getTime() + (60000 * 1));
          const duration = expirationDate.toISOString();
          //JSON.stringify({value: duration})
          window.sessionStorage.setItem('expire', duration);
          window.sessionStorage.setItem('currentUser', JSON.stringify(user));
          if (this.returnUrl !== '/') {
            this.router.navigate([this.returnUrl]);
          } else {
            this.router.navigate(['/home/dashboard']);
          }

        }
      }, error => {
        console.log(error);
      });

    console.log(this.loginForm);

  }



  // sessionSet(expirationInMin = 1) {
  //   const expirationDate = new Date(new Date().getTime() + (60000 * expirationInMin));
  //   const duration = expirationDate.toISOString();
  //   window.sessionStorage.setItem('expire', JSON.stringify(duration));
  // }
  //


}
