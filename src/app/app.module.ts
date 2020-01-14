import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChampionsComponent } from './champions/champions.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

const appRoutes: Routes = [
   { path: '', component: SearchComponent },
   { path: 'history', component: ChampionsComponent }
];
@NgModule({
   declarations: [
      AppComponent,
      ChampionsComponent,
      HeaderComponent,
      SearchComponent,
      LoadingSpinnerComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
