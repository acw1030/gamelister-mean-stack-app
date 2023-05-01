import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  URL: string = '/api/lists';

  constructor(private http: HttpClient) { }

  getLists(user?: string): Observable<List[]> {
    if (user) {
      return this.http.get<List[]>(this.URL + `?user=${user}`);
    } else {
      return this.http.get<List[]>(this.URL);
    }
  }

  getList(id: string): Observable<List> {
    return this.http.get<List>(this.URL + '/' + id);
  }

  createList(name: string, owner: string): Observable<List> {
    return this.http.post<List>(this.URL, { name: name, owner: owner });
  }

  updateList(id: string, name: string, games: string[]): Observable<List> {
    return this.http.put<List>(this.URL + '/' + id, { name: name, games: games });
  }

  deleteList(id: string): Observable<List> {
    return this.http.delete<List>(this.URL + '/' + id);
  }
}
