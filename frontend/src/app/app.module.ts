import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutes }     from './routes/routes';
import {NavigationComponent} from "./navigation/navigation.component";
import {AppComponent} from "./app.component";
import {RawShotChartComponent} from "./app-area/raw/raw_shot_chart.component";
import {FrequencyShotChartComponent} from "./app-area/frequency/frequency_shot_chart.component";
import {CompareShotChartComponent} from "./app-area/compare/compare_shot_chart.component";
import {OptionsComponent} from "./app-area/options/options.component";
import {ShooterSelectorComponent} from "./app-area/options/shooter_selector.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {StoreModule} from "@ngrx/store";
import {optionsReducer} from "./reducers/options.reducers";
import {OffensePlayersOnSelectorComponent} from "./app-area/options/offense_players_on_selector.component";
import {OffensePlayersOffSelectorComponent} from "./app-area/options/offense_players_off_selector.component";
import {DefensePlayersOffSelectorComponent} from "./app-area/options/defense_players_off_selector.component";
import {DefensePlayersOnSelectorComponent} from "./app-area/options/defense_players_on_selector.component";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DefenseTeamSelectorComponent} from "./app-area/options/defense_team_selector.component";
import {OffenseTeamSelectorComponent} from "./app-area/options/offense_team_selector.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    AppRoutes,
    HttpClientModule,
    NgSelectModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    StoreModule.forRoot({
      options: optionsReducer
    })
  ],
  exports: [
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    RawShotChartComponent,
    FrequencyShotChartComponent,
    CompareShotChartComponent,
    OptionsComponent,
    ShooterSelectorComponent,
    OffensePlayersOnSelectorComponent,
    OffensePlayersOffSelectorComponent,
    DefensePlayersOnSelectorComponent,
    DefensePlayersOffSelectorComponent,
    DefenseTeamSelectorComponent,
    OffenseTeamSelectorComponent
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
