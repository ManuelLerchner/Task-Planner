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

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board!: Board;
  fa: any = fa;

  notes: any = NOTES;
  noteList: Note[] = [];
  text!: string;

  constructor() {}

  ngOnInit(): void {
    this.noteList = this.notes[this.board.hash];
  }

  drop(event: any) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
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
