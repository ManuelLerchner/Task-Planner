import { Injectable } from '@angular/core';
import { db } from '../../db';
import { Board } from '../components/models/Board';
import { Note } from '../components/models/Note';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  constructor() {}

  async addNewBoard(boardName: string, hash: string) {
    const newBoard: Board = {
      name: boardName,
      hash: hash,
    };

    await db.boards.add(newBoard);
  }

  async addNewNote(text: string, parentHash: string) {
    const newNote: Note = {
      text: text,
      parentHash: parentHash,
    };

    await db.notes.add(newNote);
  }
}
