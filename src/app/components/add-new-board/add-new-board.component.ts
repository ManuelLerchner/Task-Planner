import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-add-new-board',
  templateUrl: './add-new-board.component.html',
  styleUrls: ['./add-new-board.component.scss'],
})
export class AddNewBoardComponent implements OnInit {
  constructor(private indexDB: IndexedDBService) {}

  ngOnInit(): void {}

  boardName = '';

  onSubmit() {
    console.log(this.boardName);
    if (this.boardName === '') {
      alert('Please enter a board name');
      return;
    }

    const hash = Math.random().toString(36).substring(2, 15);
    this.indexDB.addNewBoard(this.boardName, hash);
    this.boardName = '';
  }
}
