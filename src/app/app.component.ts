import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lol-app';
  data: string;

  handleResults(summonerName) {
    this.data = summonerName;
  }
}
