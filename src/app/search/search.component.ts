import { CommonService } from './../common.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  summonerName: string;

  @Output() public found = new EventEmitter<string>();



  constructor( private commonService: CommonService,
               private router: Router  ) { }

  ngOnInit() {
  }

  onSearch(form: NgForm) {
    this.commonService.notifyOther({option: 'onSearch', value: form.value.summonerName});
    this.router.navigate(['/history']);
  }
}
