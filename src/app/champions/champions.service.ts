import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  apiKey: string = '?api_key=RGAPI-da04d1d4-09bc-4178-b7e9-11e3370a25f6';
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
