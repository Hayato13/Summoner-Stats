import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  apiKey: string = '?api_key=RGAPI-c084a1bb-cac2-495b-8b46-16179cfd2587';
  summonerUrl: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
  matchUrl: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com//lol/match/v4/matchlists/by-account/';
  matchHistory: [];

  constructor(private http: HttpClient) {}

  fetchSummoner(summonerName: string) {
    return this.http
      .get(this.summonerUrl + summonerName + this.apiKey).pipe(
        mergeMap(summoner => this.http.get(this.matchUrl + summoner.accountId + this.apiKey))).pipe(
          mergeMap(matchHistory => {
            console.log(matchHistory.matches);
            return matchHistory.matches;
          })
        );
  }
}
