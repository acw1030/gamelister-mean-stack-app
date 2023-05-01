import { Component, OnInit } from '@angular/core';
import { Result } from '../models/result';
import { GameService } from '../services/game.service';
import { Game } from '../models/game';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  result: Result | undefined;
  games: Game[] = [];
  page: number = 1;
  sort: number = 1;
  platform: number = 1;
  search: string = '';

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.getGames(this.sort, this.platform, this.search, this.page);
  }

  getPrev(): void {
    this.page--;
    this.getGames(this.sort, this.platform, this.search, this.page);
  }

  getNext(): void {
    this.page++;
    this.getGames(this.sort, this.platform, this.search, this.page);
  }

  getGames(sort: number, platform: number, search: string, page: number): void {
    this.games = [];
    this.gameService.getGames(sort, platform, search, page).subscribe(result => { this.result = result; this.games = result.results;});
  }
}
