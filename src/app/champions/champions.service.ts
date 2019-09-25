import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  constructor(private http: HttpClient) {}

  fetchSummoner() {
    this.http
      .get('https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com//lol/platform/v3/champion-rotations?api_key=RGAPI-b62fe3c1-e7cd-4301-85c2-25cc0f6f6bcd')
      .subscribe(summoner => {
        console.log(summoner);
      });
  }
}
