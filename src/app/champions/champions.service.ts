import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  apiKey: string = '?api_key=RGAPI-d1f2ef01-b31a-41bb-9614-50292626f5c6';
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
