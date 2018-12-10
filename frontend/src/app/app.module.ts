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
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DefenseTeamSelectorComponent} from "./app-area/options/defense_team_selector.component";
import {OffenseTeamSelectorComponent} from "./app-area/options/offense_team_selector.component";
import {setPlayersReducer, setSeasonsReducer, setTeamsReducer} from "./reducers/initial.reducers";
import {InitializeEffects} from "./effects/Search";
import {EffectsModule} from "@ngrx/effects";
import {HomeComponent} from "./app-area/pages/home.component";
import {
  setColorByFreq,
  setCompareShots,
  setFrequencyShots,
  setRawShots,
  setSearchInProgress
} from "./reducers/shotchart.reducers";
import {SeasonSelectorComponent} from "./app-area/options/season_selector.component";
import {RawShotsComponent} from "./app-area/shotcharts/rawshots.component";
import {FrequencyShotsComponent} from "./app-area/shotcharts/frequencyshots.component";
import {LoadingComponent} from "./app-area/pages/loading.component";
import {ShotStatsTotalsComponent} from "./app-area/shotcharts/shot_stats_totals.component";
import {StartDateSelectorComponent} from "./app-area/options/start_date_selector.component";
import {EndDateSelectorComponent} from "./app-area/options/end_date_selector.component";
import {SeasonTypeSelectorComponent} from "./app-area/options/season_type_selector.component";
import {NgModule} from "@angular/core";
import {PeriodSelectorComponent} from "./app-area/options/period_selector.component";
import {CompareShotsComponent} from "./app-area/shotcharts/compareshots.component";
import {ColorSelectorComponent} from "./app-area/color_selector.component";


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
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    StoreModule.forRoot({
      options: optionsReducer,
      players: setPlayersReducer,
      teams: setTeamsReducer,
      seasons: setSeasonsReducer,
      rawShotChartResponse: setRawShots,
      frequencyChartResponse: setFrequencyShots,
      compareShotResponse: setCompareShots,
      searchInProgress: setSearchInProgress,
      colorByFreq: setColorByFreq
    }),
    EffectsModule.forRoot([
      InitializeEffects
    ])
  ],
  exports: [
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    RawShotsComponent,
    FrequencyShotsComponent,
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
    SeasonSelectorComponent,
    SeasonTypeSelectorComponent,
    LoadingComponent,
    ShotStatsTotalsComponent,
    StartDateSelectorComponent,
    EndDateSelectorComponent,
    PeriodSelectorComponent,
    CompareShotsComponent,
    ColorSelectorComponent
  ],
  providers: [ ShotchartService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
