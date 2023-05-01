import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL: string = '/api/users';

  constructor(private http: HttpClient) { }

  getUsers(search?: string): Observable<User[]> {
    if (search) {
      return this.http.get<User[]>(this.URL + `?search=${search}`);
    } else {
      return this.http.get<User[]>(this.URL);
    }
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.URL + '/' + id);
  }

  updateUser(id: string, username: string, email: string, admin: boolean, locked: boolean, lists: string[]): Observable<User> {
    return this.http.put<User>(this.URL + '/' + id, { username: username, email: email, admin: admin, locked: locked, lists: lists });
  }

  updateUserPassword(id: string, password: string): Observable<User> {
    return this.http.put<User>(this.URL + '/' + id, { password: password });
  }
}
