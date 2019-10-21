import { ChampionsService } from './champions.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import championData from '../../../ChampionItemInfo/champion.json';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {
  summonerName: string;
  summonerIconPath: string;
  matchHistory: object[] = [];
  searched: boolean = false;
  searchUnused: boolean = true;
  champions: any = championData;
  matchId: object[] = [];
  participantIdentities: object[] = [];
  participants: object[] = [];
  participantStats: object[] = [];
  summonerObject: object;
  summonerIcon: number[] = [];
  matchStatsObject: object[] = [];
  matchStats;
  participantIdentitiesArray: object[] = [];


  constructor(public championsService: ChampionsService) { }

  ngOnInit() {
  }

  onSearch(form: NgForm) {
    this.summonerName = form.value.summonerName;
    this.championsService.fetchSummoner(this.summonerName)
      .subscribe((matchHistoryResponse: object[]) => {
        this.matchHistory.push(matchHistoryResponse);
      });
    this.championsService.fetchMatchId(this.summonerName)
      .subscribe((matchHistoryResponse: number) => {
        const matchId = matchHistoryResponse;
        console.log(matchId);
        this.championsService.fetchMatchData(matchId)
          .subscribe((matchStats: {}) => {
            console.log(matchId);
            // this.matchStats = matchStats;
            this.participantIdentities = matchStats.participantIdentities;
            this.participantIdentities.gameId = matchStats.gameId;
            this.participantIdentitiesArray.push(matchStats);
            this.participants = matchStats.participants;
            // console.log(this.participants);
            this.matchSummonerName();
          });
      });
    this.searched = !this.searched;
    this.searchUnused = !this.searchUnused;
  }

  matchSummonerName() {
    // this.matchStatsObject.push({gameId : this.matchStats.gameId, participantIdentities : this.matchStats.participantIdentities});
    // this.matchStatsObject.sort((a, b) => b.gameId - a.gameId);
    // for (const id of this.matchStatsObject) {
    //   this.participantIdentities.push(id.participantIdentities);
    // }
    // this.participantIdentities.splice((this.participantIdentities.length / 4) , (this.participantIdentities.length / 4));
    // console.log(this.participantIdentities);
    for (const name of this.participantIdentities) {
      if (name.player.summonerName.toLowerCase() === this.summonerName.toLowerCase()) {
        this.summonerObject = this.participantIdentities[name.participantId - 1].player.summonerName;
        this.participantStats.push(this.participants[name.participantId - 1]);
        this.summonerIcon.push(this.participantIdentities[name.participantId - 1].player.profileIcon);
        this.summonerIconPath = 'http://ddragon.leagueoflegends.com/cdn/9.20.1/img/profileicon/' + this.summonerIcon[0] + '.png';
      }
    }
  }


}
