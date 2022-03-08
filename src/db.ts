import Dexie, { Table } from 'dexie';
import { Board } from './app/components/models/Board';
import { Note } from './app/components/models/Note';

export class AppDB extends Dexie {
  boards!: Table<Board, number>;
  notes!: Table<Note, number>;

  constructor() {
    super('Task-Planner');
    this.version(3).stores({
      boards: '++id',
      notes: '++id,parentHash,order',
    });
  }
}

export const db = new AppDB();
