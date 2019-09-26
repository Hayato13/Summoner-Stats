import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  apiKey: string = '?api_key=RGAPI-86c8d3a8-fcd6-4c6d-ab8b-724301388830';
  url: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';

  constructor(private http: HttpClient) {}

  fetchSummoner(summonerName: string) {
    this.http
      .get(this.url + summonerName + this.apiKey)
      .subscribe(summoner => {
        console.log(summoner);
      });
  }
}
