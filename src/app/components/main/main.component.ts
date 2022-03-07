import { Component, OnInit } from '@angular/core';

import { BOARDS } from 'mock-boards';
import { Board } from '../models/Board';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor() {}

  boards: Board[] = BOARDS.boards;

  ngOnInit(): void {}
}
