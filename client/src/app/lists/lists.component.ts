import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { List } from '../models/list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists: List[] = [];

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.getLists();
  }

  getLists(): void {
    this.lists = [];
    this.listService.getLists().subscribe(result => { this.lists = result; });
  }

  createList(): void {
    let prompt = window.prompt('Please enter a list name.');
    if (prompt && prompt != '') {
      this.listService.createList(prompt, '0').subscribe(() => this.getLists());
    }
  }
}