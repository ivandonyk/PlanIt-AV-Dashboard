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

    console.log(localStorage.getItem('currentUser'))
    if (localStorage.getItem('currentUser') !== null) {
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
          localStorage.setItem('currentUser', JSON.stringify(user));

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

}
