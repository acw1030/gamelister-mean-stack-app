import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  password1: string = '';
  password2: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(): void {
    if (this.username === '' || this.email === '' || this.password1 === '' || this.password2 === '') {
      alert('One or more fields were left blank.')
    }
    else if (this.password1 !== this.password2) {
      alert('Passwords do not match.')
    } else {
      this.authService.register(this.username, this.email, this.password1).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (e) => {
          alert(e.error);
        }
      });
    }
  }
}
