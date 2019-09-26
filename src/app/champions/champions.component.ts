import { ChampionsService } from './champions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {
  summonerName: string;

  constructor(private championsService: ChampionsService) { }

  ngOnInit() {
  }

  onSearch() {
    // this.championsService.fetchSummoner(summonerName);
    this.summonerName = document.getElementById('summonerName').value;
    console.log(this.championsService.fetchSummoner(this.summonerName));
  }
}
