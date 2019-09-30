import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  apiKey: string = '?api_key=RGAPI-49c1c599-31f3-4972-b3a8-ccfa6d8324d0';
  summonerUrl: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
  matchUrl: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com//lol/match/v4/matchlists/by-account/';
  matchHistory: [];

  constructor(private http: HttpClient) {}

  fetchSummoner(summonerName: string) {
    this.http
      .get(this.summonerUrl + summonerName + this.apiKey).pipe(
        mergeMap(summoner => this.http.get(this.matchUrl + summoner.accountId + this.apiKey)))
        .subscribe(matchHistory => {
          this.matchHistory = matchHistory.matches;
        });
  }

  getMatchHistory() {
    return this.matchHistory;
  }
}
