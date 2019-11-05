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
  summonerIcon: number;
  matchStatsObject: object[] = [];
  matchStats;
  participantIdentitiesArray: object[] = [];
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  itemArray: number[] = [];
  itemImgSrc0: string = '../../../assets/img/img/item/';
  itemImgSrc1: string = '../../../assets/img/img/item/';
  itemImgSrc2: string = '../../../assets/img/img/item/';
  itemImgSrc3: string = '../../../assets/img/img/item/';
  itemImgSrc4: string = '../../../assets/img/img/item/';
  itemImgSrc5: string = '../../../assets/img/img/item/';
  itemImgSrc6: string = '../../../assets/img/img/item/';


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
        this.championsService.fetchMatchData(matchId)
          .subscribe((matchStats: {}) => {
            this.participantIdentities = matchStats.participantIdentities;
            this.participantIdentities.gameId = matchStats.gameId;
            this.participants = matchStats.participants;
            this.participants.gameId = matchStats.gameId;
            this.matchSummonerName(this.participantIdentities);
          });
      });
    this.searched = !this.searched;
    this.searchUnused = !this.searchUnused;
  }

  matchSummonerName(participantIds) {
    for (const name of participantIds) {
      if (name.player.summonerName.toLowerCase() === this.summonerName.toLowerCase()) {
        this.summonerObject = participantIds[name.participantId - 1].player.summonerName;
        console.log(participantIds);
        this.item0 = this.participants[name.participantId - 1].stats.item0;
        this.participants[name.participantId - 1].gameId = participantIds.gameId;
        this.participants[name.participantId - 1].profileIcon = participantIds[name.participantId - 1].player.profileIcon;
        this.participantStats.push(this.participants[name.participantId - 1]);
        this.participantStats.sort((a , b) => b.gameId - a.gameId);
        console.log(this.participantStats);
        this.summonerIcon = this.participantStats[0].profileIcon;
        this.summonerIconPath = 'http://ddragon.leagueoflegends.com/cdn/9.20.1/img/profileicon/' + this.summonerIcon + '.png';
      }
    }
  }


}
