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

  constructor(public championsService: ChampionsService) { }

  ngOnInit() {
  }

  onSearch(form: NgForm) {
    this.summonerName = form.value.summonerName;
    this.summonerIconPath = 'http://avatar.leagueoflegends.com/na1/' + this.summonerName + '.png';
    this.championsService.fetchSummoner(this.summonerName)
      .subscribe((matchHistoryResponse: object[]) => {
        this.matchHistory.push(matchHistoryResponse);
      });
    this.championsService.fetchMatchId(this.summonerName)
      .subscribe((matchHistoryResponse: []) => {
        const matchId = [];
        matchId.push(matchHistoryResponse);
        this.championsService.fetchMatchData(matchId[0])
          .subscribe((matchStats: {}) => {
            console.log(matchStats);
          });
      });
    this.searched = !this.searched;
    this.searchUnused = !this.searchUnused;
  }
}
