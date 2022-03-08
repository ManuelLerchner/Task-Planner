import { Component, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { NOTES } from './../../../../mock-notes';
import { Board } from '../models/Board';
import { Note } from '../models/Note';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { liveQuery, PromiseExtended } from 'dexie';
import { db } from 'src/db';
import { Observable, combineLatest } from 'rxjs';
import { IndexedDBService } from 'src/app/services/indexed-db.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board!: Board;
  fa: any = fa;

  text!: string;

  noteList: any = liveQuery(() =>
    db.notes
      .where({
        parentHash: this.board.hash,
      })
      .toArray()
  );

  ngOnInit(): void {}

  drop(event: CdkDragDrop<any>, board: Board) {}

  identifyNote(index: number, note: Note) {
    return `${note.id}_$${note.parentHash}_${note.text}`;
  }

  addNode(): void {
    if (this.text === '') {
      alert('Please enter a note');
    }

    console.log(this.text);
    this.text = '';
  }

  deleteBoard(board: Board): void {}
}
