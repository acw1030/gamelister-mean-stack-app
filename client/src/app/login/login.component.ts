import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.email === '' || this.password === '') {
      alert('One or more fields were left blank.')
    }
    else {
      this.authService.login(this.email, this.password).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (e) => {
          alert(e.error);
        }
      });
    }
  }
}
