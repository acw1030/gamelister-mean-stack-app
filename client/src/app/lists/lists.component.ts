import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ListService } from '../services/list.service';
import { List } from '../models/list';
import { User } from '../models/user';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  user: User | undefined;
  lists: List[] = [];

  constructor(
    public authService: AuthService,
    private listService: ListService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user) this.getLists(this.user._id);
  }

  getLists(id: string): void {
    this.lists = [];
    this.listService.getLists(id).subscribe(result => { this.lists = result; });
  }

  createList(): void {
    if (this.user) {
      let id = this.user._id;
      let prompt = window.prompt('Please enter a list name.');
      if (prompt && prompt != '') {
        this.listService.createList(prompt, id).subscribe(() => this.getLists(id));
      }
    }
  }
}