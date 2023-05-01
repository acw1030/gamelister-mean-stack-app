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
    this.getLists();
  }

  onChange(newValue: string) {
    if (this.game) {
      let g_name = this.game.name;
      let g_slug = this.game.slug;
      this.listService.getList(newValue).subscribe(result => {
        let games = result.games;
        games.push(g_slug);
        this.listService.updateList(result._id, result.name, games).subscribe(result => {
          alert(`${g_name} added to ${result.name}`);
        });
      });
    }
    this.selectedList = '0';
  }

  getGame(): void {
    this.gameService.getGame(this.route.snapshot.paramMap.get('id')!)
      .subscribe(game => this.game = game);
  }

  getLists(): void {
    this.lists = [];
    this.listService.getLists().subscribe(result => { this.lists = result; });
  }

  goBack(): void {
    this.location.back();
  }

}
