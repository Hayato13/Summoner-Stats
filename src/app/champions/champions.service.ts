import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  apiKey: string = '?api_key=RGAPI-a6da12cc-03a4-4483-819e-80bda58f8899';
  summonerUrl: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
  matchUrl: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com//lol/match/v4/matchlists/by-account/';
  matchStats: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matches/';
  matchHistory: [];
  matchId: [] = [];

  constructor(private http: HttpClient) {}

  fetchSummoner(summonerName: string) {
    return this.http
      .get(this.summonerUrl + summonerName + this.apiKey).pipe(
        mergeMap(summoner => this.http.get(this.matchUrl + summoner.accountId + this.apiKey))).pipe(
          mergeMap(matchHistory => {
            this.matchHistory = matchHistory.matches;
            for(const history of this.matchHistory) {
              this.matchId.push(history.gameId);
            }
            return matchHistory.matches;
          })
        );
  }

  fetchMatch(summonerName: string) {
  }
}
