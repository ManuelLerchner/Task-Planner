import { Component, OnInit } from '@angular/core';

import { BOARDS } from 'mock-boards';
import { Board } from '../models/Board';
import { liveQuery } from 'dexie';
import { db } from 'src/db';
import { IndexedDBService } from '../../services/indexed-db.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  boards$ = liveQuery(() => db.boards.toArray());
  listName = '';

  constructor(private indexDB: IndexedDBService) {}

  ngOnInit(): void {}

  handleAddNewBoard() {
    const hash = Math.random().toString(36).substring(2, 15);
    this.indexDB.addNewBoard(this.listName, hash);
    this.listName = '';
  }

  identifyBoard(index: number, board: Board) {
    return `${board.id}_$${board.hash}_${board.name}`;
  }
}
