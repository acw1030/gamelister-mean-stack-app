import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ListService } from '../services/list.service';
import { GameService } from '../services/game.service';
import { List } from '../models/list';
import { Game } from '../models/game';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  game: Game | undefined;
  lists: List[] = [];
  selectedList: string = '0';

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private listService: ListService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getGame();
  }

  onChange(newValue: string) {
    if (this.game) {
      let game = this.game;
      this.listService.getList(newValue).subscribe(result => {
        let games = result.games;
        games.push(game.slug);
        this.listService.updateList(result._id, result.name, games).subscribe(result => {
          alert(`"${game.name}" added to ${result.name}.`);
          this.selectedList = '0';
          this.getLists(game);

        });
      });
    }
  }

  getGame(): void {
    this.gameService.getGame(this.route.snapshot.paramMap.get('id')!)
      .subscribe(game => { this.game = game; this.getLists(game); });
  }

  getLists(game: Game): void {
    this.lists = [];
    this.listService.getLists().subscribe(result => {
      this.lists = result.filter(l => l.games.indexOf(game.slug) === -1);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
