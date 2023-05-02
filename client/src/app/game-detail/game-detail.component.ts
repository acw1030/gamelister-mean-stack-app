import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ListService } from '../services/list.service';
import { GameService } from '../services/game.service';
import { AuthService } from '../services/auth.service';
import { List } from '../models/list';
import { Game } from '../models/game';
import { User } from '../models/user';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  user: User | undefined;
  game: Game | undefined;
  lists: List[] = [];
  selectedList: string = '0';

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private listService: ListService,
    public authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getGame();
  }

  onChange(newValue: string) {
    if (this.game && this.user) {
      let game = this.game;
      let user = this.user;
      this.listService.getList(newValue).subscribe(result => {
        let games = result.games;
        games.push(game.slug);
        this.listService.updateList(result._id, result.name, games).subscribe(result => {
          alert(`"${game.name}" added to ${result.name}.`);
          this.selectedList = '0';
          this.getLists(user, game);
        });
      });
    }
  }

  getGame(): void {
    this.gameService.getGame(this.route.snapshot.paramMap.get('id')!)
      .subscribe(game => { this.game = game; if (this.user) this.getLists(this.user, game); });
  }

  getLists(user: User, game: Game): void {
    this.lists = [];
    this.listService.getLists(user._id).subscribe(result => {
      this.lists = result.filter(l => l.games.indexOf(game.slug) === -1);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
