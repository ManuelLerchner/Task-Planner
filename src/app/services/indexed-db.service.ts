import { Injectable } from '@angular/core';

import { db } from '../../db';
import { Board } from '../components/models/Board';
import { COLORS } from '../components/models/Colors';
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

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  async addNewNote(text: string, parentHash: string) {
    let notes = await db.notes
      .where('parentHash')
      .equals(parentHash)
      .sortBy('order');

    let biggestOrder = 0;

    if (notes.length !== 0) {
      biggestOrder = notes[notes.length - 1].order + 1;
    }

    const newNote: Note = {
      text: text,
      parentHash: parentHash,
      order: biggestOrder,
      colorIndex: this.getRandomInt(0, COLORS.length),
    };

    await db.notes.add(newNote);
  }

  async moveNodetoBoard(note: Note, newBoard: Board, insertIndex: number) {
    let notes = await db.notes
      .where('parentHash')
      .equals(newBoard.hash)
      .sortBy('order');

    //update board
    db.notes
      .where('id')
      .equals(note.id as number)
      .modify((note) => {
        note.parentHash = newBoard.hash;
      });

    if (notes.length == 0) {
      return;
    }

    //insert at beginning
    if (insertIndex === 0) {
      db.notes
        .where('id')
        .equals(note.id as number)
        .modify((otherNode) => {
          otherNode.order = notes[0].order - 1;
        });
      return;
    }

    let prevNode = notes[insertIndex - 1];

    //swap directly below
    if (prevNode.id === note.id) {
      let oldOrder: number = note.order as number;

      db.notes
        .where('id')
        .equals(note.id as number)
        .modify((otherNode) => {
          otherNode.order = notes[insertIndex].order;
        });

      db.notes
        .where('id')
        .equals(notes[insertIndex].id as number)
        .modify((otherNode) => {
          otherNode.order = oldOrder;
        });

      return;
    }

    //insert somewhere inbetween or at the end
    db.notes
      .where('parentHash')
      .equals(newBoard.hash)

      .and((otherNode) => otherNode.order > prevNode.order)
      .modify((otherNode) => {
        otherNode.order = otherNode.order + 1;
      });

    db.notes
      .where('id')
      .equals(note.id as number)
      .modify((otherNode) => {
        otherNode.order = prevNode.order + 1;
      });
  }

  async deleteBoard(board: Board) {
    await db.notes
      .where('parentHash')
      .equals(board.hash as string)
      .delete();

    await db.boards
      .where('id')
      .equals(board.id as number)
      .delete();
  }

  async deleteNote(note: Note) {
    await db.notes
      .where('id')
      .equals(note.id as number)
      .delete();
  }

  async updateColor(note: Note, colorArrayLength: number) {
    await db.notes
      .where('id')
      .equals(note.id as number)
      .modify((otherNode) => {
        otherNode.colorIndex = (otherNode.colorIndex + 1) % colorArrayLength;
      });
  }
}
