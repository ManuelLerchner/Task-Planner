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
      notes: '++id,parentHash',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    let mockData: Board[] = [
      {
        id: 1,
        hash: '1',
        name: 'Feed the birds',
      },
      {
        id: 2,
        hash: '2',
        name: 'Watch a movie',
      },
      {
        id: 3,
        hash: '3',
        name: 'Have some sleep',
      },
    ];

    await db.boards.bulkAdd(mockData);

    let mockNotes: Note[] = [
      {
        id: 10,
        parentHash: '1',
        text: 'Feed the birds',
      },
      {
        id: 20,
        parentHash: '2',
        text: 'Feed the cringe',
      },
      {
        id: 30,
        parentHash: '3',
        text: 'Feed the sus',
      },
    ];

    await db.notes.bulkAdd(mockNotes);
  }
}

export const db = new AppDB();
