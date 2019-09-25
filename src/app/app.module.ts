import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChampionsComponent } from './champions/champions.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
@NgModule({
   declarations: [
      AppComponent,
      ChampionsComponent,
      HeaderComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
