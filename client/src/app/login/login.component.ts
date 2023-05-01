import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.email === '' || this.password === '') {
      alert('One or more fields were left blank.')
    }
    else {
      this.authService.login(this.email, this.password);
    }
  }
}
