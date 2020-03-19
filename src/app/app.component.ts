import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lol-app';
  data: string;

  constructor(private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.location.subscribe(x => {
      const elem = document.querySelector('#champion');
      console.log(x);
      elem.remove();
      document.location.href = '/';
    });
    this.router.navigate(['']);
  }
}
