import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  URL: string = '/api/games';

  constructor(private http: HttpClient) { }

  getGames(sort: number, platform: number, search: string, page: number): Observable<Result> {
    return this.http.get<Result>(this.URL + `?sort=${sort}&platform=${platform}&search=${search}&page=${page}`);
  }

  getGame(id: string): Observable<Game> {
    return this.http.get<Game>(this.URL + '/' + id);
  }

}