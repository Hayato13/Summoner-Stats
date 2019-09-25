import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {
  apiKey: string = 'RGAPI-aceb0a92-195f-4903-93c5-ea1e0b3e1762';
  url: string = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/RiotSchmick?api_key=<key>';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchSummoner();
  }

  private fetchSummoner() {
    this.http
      .get('https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com//lol/platform/v3/champion-rotations?api_key=RGAPI-b62fe3c1-e7cd-4301-85c2-25cc0f6f6bcd')
      .subscribe(summoner => {
        console.log(summoner);
      });
  }
}
