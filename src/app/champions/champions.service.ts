import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { ConsoleReporter } from 'jasmine';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  apiKey: string = '?api_key=RGAPI-71a6228e-763d-4580-add8-5867e7377b2d';
  summonerUrl: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
  matchUrl: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com//lol/match/v4/matchlists/by-account/';
  matchStats: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matches/';
  matchHistory;
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

  fetchMatchId(summonerName: string) {
    return this.http
      .get(this.summonerUrl + summonerName + this.apiKey).pipe(
        mergeMap(summoner => this.http.get(this.matchUrl + summoner.accountId + this.apiKey))).pipe(
          mergeMap(matchHistory => {
            for (const history of matchHistory.matches) {
              this.matchId.push(history.gameId);
            }
            this.matchId.splice(56 , 56);
            return this.matchId;
          })
        );
  }

  fetchMatchData(matchId: number[]) {
    for ( const matchNum of matchId) {
      return this.http
      .get(this.matchStats + matchNum + this.apiKey).pipe(
        mergeMap(matchStatistics => {
          console.log (matchStatistics);
        }));
    }
  }

}
