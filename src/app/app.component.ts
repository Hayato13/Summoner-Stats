import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lol-app';
  data: string;

  constructor(private location: Location) { }

  ngOnInit() {
    this.location.subscribe(x => {
      const elem = document.querySelector('#champion');
      console.log(x);
      elem.remove();
      document.location.href = '/';
    });
  }
}
