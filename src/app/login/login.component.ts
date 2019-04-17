import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userName : new FormControl(''),
    password : new FormControl(''),

  })

  constructor(loginService: LoginService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  }





  onSubmit() {
    //TODO : use eventemitter with form value
    console.log('In onSubmit...Yeah!');
    this.router.navigate(['/home']);

  }

}
