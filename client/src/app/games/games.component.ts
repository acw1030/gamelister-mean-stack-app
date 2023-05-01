import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  sort: string = '1';
  platform: string = '1';
  search: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService) { }

  ngOnInit(): void {
    let q_sort = this.route.snapshot.queryParamMap.get('sort');
    let q_platform = this.route.snapshot.queryParamMap.get('platform');
    let q_search = this.route.snapshot.queryParamMap.get('search');
    let q_page = this.route.snapshot.queryParamMap.get('page');

    if (q_sort) this.sort = q_sort;
    if (q_platform) this.platform = q_platform;
    if (q_search) this.search = q_search;
    if (q_page) this.page = parseInt(q_page);

    this.getGames();
  }

  getGames(): void {
    this.games = [];
    this.gameService.getGames(this.sort, this.platform, this.search, this.page).subscribe(result => { this.result = result; this.games = result.results; });
  }

  getPrev(): void {
    this.page--;
    this.getSearch();
  }

  getNext(): void {
    this.page++;
    this.getSearch();
  }

  getSearch(): void {
    this.router.navigateByUrl(`/games?sort=${this.sort}&platform=${this.platform}&search=${this.search}&page=${this.page}`);
    this.getGames();
  }
}
