import { ChampionsService } from './champions.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onSearch(form: NgForm) {
    // this.championsService.fetchSummoner(summonerName);
    this.summonerName = form.value.summonerName;
    console.log(this.championsService.fetchSummoner(this.summonerName));
  }
}
