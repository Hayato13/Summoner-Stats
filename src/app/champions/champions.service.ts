import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  apiKey: string = '?api_key=RGAPI-dfcbaea5-7c4f-4c50-a288-ffa6923bf83a';
  summonerUrl: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
  matchUrl: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com//lol/match/v4/matchlists/by-account/';
  matchStats: string = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matches/';
  matchHistory: any;
  matchId: number[] = [];

  constructor(private http: HttpClient) {}

  fetchSummoner(summonerName: string) {
    return this.http
      .get(this.summonerUrl + summonerName + this.apiKey).pipe(
        mergeMap((summoner: any) => this.http.get(this.matchUrl + summoner.accountId + this.apiKey))).pipe(
          mergeMap((matchHistory: any) => {
            this.matchHistory = matchHistory.matches;
            for (const history of this.matchHistory) {
              this.matchId.push(history.gameId);
            }
            return matchHistory.matches;
          })
        );
  }

  fetchMatchId(summonerName: string) {
    return this.http
      .get(this.summonerUrl + summonerName + this.apiKey).pipe(
        mergeMap((summoner: any) => this.http.get(this.matchUrl + summoner.accountId + this.apiKey))).pipe(
          mergeMap((matchHistory: any) => {
            for (const history of matchHistory.matches) {
              this.matchId.push(history.gameId);
            }
            this.matchId.splice((this.matchId.length / 2) , (this.matchId.length / 2));
            return this.matchId;
          })
        );
  }

  fetchMatchData(matchId: number) {
    return this.http
    .get(this.matchStats + matchId + this.apiKey).pipe(
      map(matchStatistics => {
        return matchStatistics;
      }));
  }
}
