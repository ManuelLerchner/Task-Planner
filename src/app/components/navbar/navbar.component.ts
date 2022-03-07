import { Component, OnInit } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavBarComponent implements OnInit {
  title: string = 'Angular';
  subtitle: string = 'Angular';

  fa: any = fa;

  constructor() {}

  ngOnInit(): void {}
}
