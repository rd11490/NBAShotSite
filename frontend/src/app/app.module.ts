import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ShotchartService} from './services/shotchart.service'
import {AppRoutes} from './routes/routes';
import {NavigationComponent} from "./app-area/navigation.component";
import {AppComponent} from "./app.component";
import {RawShotChartComponent} from "./app-area/pages/raw_shot_chart.component";
import {FrequencyShotChartComponent} from "./app-area/pages/frequency_shot_chart.component";
import {CompareShotChartComponent} from "./app-area/pages/compare_shot_chart.component";
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
import {setPlayersReducer, setSeasonsReducer, setTeamsReducer} from "./reducers/initial.reducers";
import {InitializeEffects} from "./effects/Search";
import {EffectsModule} from "@ngrx/effects";
import {HomeComponent} from "./app-area/pages/home.component";
import {setCompareShots, setFrequencyShots, setRawShots, setSearchInProgress} from "./reducers/shotchart.reducers";
import {SeasonSelectorComponent} from "./app-area/options/season_selector.component";

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
      options: optionsReducer,
      players: setPlayersReducer,
      teams: setTeamsReducer,
      seasons: setSeasonsReducer,
      rawShotChartResponse: setRawShots,
      frequencyChartResponse: setFrequencyShots,
      compareShotResponse: setCompareShots,
      searchInProgress: setSearchInProgress
    }),
    EffectsModule.forRoot([
      InitializeEffects
    ])
  ],
  exports: [
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
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
    OffenseTeamSelectorComponent,
    SeasonSelectorComponent
  ],
  providers: [ ShotchartService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
