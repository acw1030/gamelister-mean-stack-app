import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GameLister';

  constructor(
    public router: Router,
    public authService: AuthService) { }

  logout():void {
    this.authService.logout().subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (e) => {
        alert(e.error);
      }
    });
  }
}