import { Component, Input, OnInit } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';

import { Note } from '../models/Note';
import { IndexedDBService } from '../../services/indexed-db.service';
import { COLORS } from '../models/Colors';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() note!: Note;

  fa: any = fa;

  constructor(private indexDB: IndexedDBService) {}

  ngOnInit(): void {}

  deleteNote(note: Note): void {
    this.indexDB.deleteNote(note);
  }

  changeColor(): void {
    this.indexDB.updateColor(this.note, COLORS.length);
  }

  getColor(): string {
    return COLORS[this.note.colorIndex];
  }
}
