import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private URL: string = '/api';
  public user?: User = undefined;

  constructor(
    private router: Router,
    private http: HttpClient) {
    this.ngOnInit();
  }

  ngOnInit() {
    this.getAuthenticatedUser().subscribe();
  }

  isAuthenticated() {
    return this.user != undefined;
  }

  getAuthenticatedUser(): Observable<User> {
    let txt = window.localStorage.getItem('user');
    if (txt) {
      let user: User = JSON.parse(txt as string) as User;
      this.setUser(user);
      return of(user);
    } else {
      return this.http.get<User>(this.URL + '/user').pipe(tap(u => { this.setUser(u); }));
    }
  }

  setUser(user: User | undefined): void {
    this.user = user;
    if (this.user) {
      window.localStorage.setItem('user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('user');
    }
  }

  register(username: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(this.URL + '/register', { username: username, email: email, password: password })
      .pipe(tap({
        next: u => { this.setUser(u); this.router.navigateByUrl('/'); },
        error: e => { alert(e) }
      }));
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.URL + '/login', { email: email, password: password })
      .pipe(tap({
        next: u => { this.setUser(u); this.router.navigateByUrl('/'); },
        error: e => { alert(e) }
      }));
  }

  logout() {
    return this.http.post<User>(this.URL + '/logout', {})
      .pipe(tap(() => { this.setUser(undefined); this.router.navigateByUrl('/'); }));
  }
}
