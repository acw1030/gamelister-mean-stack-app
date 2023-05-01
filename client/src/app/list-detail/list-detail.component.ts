import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../services/list.service';
import { GameService } from '../services/game.service';
import { List } from '../models/list';
import { Game } from '../models/game';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  list: List | undefined;
  games: Game[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private listService: ListService,
    private gameService: GameService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.listService.getList(this.route.snapshot.paramMap.get('id')!)
      .subscribe(result => { this.list = result; this.getGames(result); });
  }

  getGames(list: List): void {
    this.games = [];
    for (let g in list.games) {
      this.gameService.getGame(list.games[g]).subscribe(result => this.games.push(result));
    }
  }

  goBack(): void {
    this.location.back();
  }

  removeGame(slug: string): void {
    if (this.list) {
      let list = this.list;
      let newGames = list.games.filter(g => g !== slug);
      this.listService.updateList(list._id, list.name, newGames)
        .subscribe(result => { this.list = result; this.getGames(result); });
    }
  }

  renameList(): void {
    if (this.list) {
      let prompt = window.prompt('Please enter a list name.');
      if (prompt && prompt != '') {
        this.listService.updateList(this.list._id, prompt, this.list.games).subscribe(result => this.list = result);
      }
    }
  }

  deleteList(): void {
    if (this.list) {
      if (confirm("Delete list?")) {
        this.listService.deleteList(this.list._id).subscribe(() => this.router.navigateByUrl('/lists'));
      }
    }
  }
}