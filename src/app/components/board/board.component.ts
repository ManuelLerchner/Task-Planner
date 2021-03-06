import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { liveQuery } from 'dexie';

import { IndexedDBService } from 'src/app/services/indexed-db.service';
import { Board } from '../models/Board';
import { Note } from '../models/Note';
import { db } from 'src/db';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board!: Board;
  fa: any = fa;

  text: string = '';

  constructor(private indexDB: IndexedDBService) {}

  noteList: any = liveQuery(() =>
    db.notes.where('parentHash').equals(this.board.hash).sortBy('order')
  );

  ngOnInit() {}

  async drop(event: CdkDragDrop<any>, board: Board) {
    let movedNote = event.item.data;
    let insertIndex: number = event.currentIndex;

    await this.indexDB.moveNodetoBoard(movedNote, board, insertIndex);
  }

  identifyNote(index: number, note: Note) {
    return `${note.id}_$${note.parentHash}_${note.text}`;
  }

  addNote(): void {
    if (this.text === '') {
      alert('Please enter a note');
      return;
    }

    this.indexDB.addNewNote(this.text, this.board.hash);
    this.text = '';
  }

  async deleteBoard(board: Board) {
    this.indexDB.deleteBoard(board);
  }
}
