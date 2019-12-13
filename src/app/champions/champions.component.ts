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
  matchStats: object[] = [];
  teammate1: object;
  teammate2: object;
  teammate3: object;
  teammate4: object;
  teammate5: object;
  opponent1: object;
  opponent2: object;
  opponent3: object;
  opponent4: object;
  opponent5: object;
  participantIdentitiesArray: object[] = [];
  itemImgSrc0: string = '../../../assets/img/img/item/';
  itemImgSrc1: string = '../../../assets/img/img/item/';
  itemImgSrc2: string = '../../../assets/img/img/item/';
  itemImgSrc3: string = '../../../assets/img/img/item/';
  itemImgSrc4: string = '../../../assets/img/img/item/';
  itemImgSrc5: string = '../../../assets/img/img/item/';
  itemImgSrc6: string = '../../../assets/img/img/item/';
  defaultIcon: string = '../../../assets/img/img/profileicon/';
  championIcon: string = '../../../assets/img/img/champion/';
  spellIcon: string = '../../../assets/img/img/spell/';


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
            this.participants.sort((a, b) => b.gameId - a.gameId);
            this.participantIdentities.sort((a, b) => b.gameId - a.gameId);
            for (const name of this.participantIdentities) {
              if (name.player.summonerName.toLowerCase() === this.summonerName.toLowerCase()) {
                this.participants[name.participantId - 1].stats.blue1 = this.participantIdentities[0].player.summonerName;
                this.participants[name.participantId - 1].stats.blue2 = this.participantIdentities[1].player.summonerName;
                this.participants[name.participantId - 1].stats.blue3 = this.participantIdentities[2].player.summonerName;
                this.participants[name.participantId - 1].stats.blue4 = this.participantIdentities[3].player.summonerName;
                this.participants[name.participantId - 1].stats.blue5 = this.participantIdentities[4].player.summonerName;
                this.participants[name.participantId - 1].stats.red1 = this.participantIdentities[5].player.summonerName;
                this.participants[name.participantId - 1].stats.red2 = this.participantIdentities[6].player.summonerName;
                this.participants[name.participantId - 1].stats.red3 = this.participantIdentities[7].player.summonerName;
                this.participants[name.participantId - 1].stats.red4 = this.participantIdentities[8].player.summonerName;
                this.participants[name.participantId - 1].stats.red5 = this.participantIdentities[9].player.summonerName;

              }
            }
            // console.log(this.participants);
            // console.log(this.participantIdentities);
          });
      });
    this.searched = !this.searched;
    this.searchUnused = !this.searchUnused;
  }

  matchSummonerName(participantIds) {
    for (const name of participantIds) {
      if (name.player.summonerName.toLowerCase() === this.summonerName.toLowerCase()) {
        this.summonerObject = participantIds[name.participantId - 1].player.summonerName;
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
