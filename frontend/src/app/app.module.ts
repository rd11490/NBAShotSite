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
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSortModule,
  MatTableModule, MatTabsModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DefenseTeamSelectorComponent} from "./app-area/options/defense_team_selector.component";
import {OffenseTeamSelectorComponent} from "./app-area/options/offense_team_selector.component";
import {
  setPlayersReducer,
  setSeasons3Reducer,
  setSeasons5Reducer,
  setSeasonsReducer,
  setTeamsReducer
} from "./reducers/initial.reducers";
import {InitializeEffects} from "./effects/Search";
import {EffectsModule} from "@ngrx/effects";
import {HomeComponent} from "./app-area/pages/home.component";
import {
  setColorByFreq,
  setCompareShots,
  setFourFactors,
  setFrequencyShots,
  setInvertColor,
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
import {fourFactorsOptionsReducer} from "./reducers/fourfactors_options.reducers";
import {FourFactorsComponent} from "./app-area/pages/four_factors.component";
import {FourFactorsOptionsComponent} from "./app-area/fourfactors_options/fourfactors_options.component";
import {FourFactorsPlayerSelectorComponent} from "./app-area/fourfactors_options/fourfactors_players_selector.component";
import {FourFactorsTeamsSelectorComponent} from "./app-area/fourfactors_options/fourfactors_teams_selector.component";
import {FourFactorsSeasonSelectorComponent} from "./app-area/fourfactors_options/fourfactors_season_selector.component";
import {FourFactorsTableComponent} from "./app-area/tables/fourfactors_tables.component";
import {CSVEffect} from "./effects/CSVEffect";
import {DownloadCSV} from "./services/download_csv.service";
import {FourFactorsThreeYearComponent} from "./app-area/pages/four_factors_three_year.component";
import {FourFactorsFiveYearComponent} from "./app-area/pages/four_factors_five_year.component";
import {FourFactorsThreeYearOptionsComponent} from "./app-area/fourfactors_options/fourfactors_options3.component";
import {FourFactorsFiveYearOptionsComponent} from "./app-area/fourfactors_options/fourfactors_options5.component";
import {FourFactorsFiveSeasonSelectorComponent} from "./app-area/fourfactors_options/fourfactors_season_five_year_selector.component";
import {FourFactorsThreeSeasonSelectorComponent} from "./app-area/fourfactors_options/fourfactors_season_three_year_selector.component";


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
    MatTabsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    StoreModule.forRoot({
      options: optionsReducer,
      fourFactorsOptions: fourFactorsOptionsReducer,
      players: setPlayersReducer,
      teams: setTeamsReducer,
      seasons: setSeasonsReducer,
      threeYearSeasons: setSeasons3Reducer,
      fiveYearSeasons: setSeasons5Reducer,
      rawShotChartResponse: setRawShots,
      frequencyChartResponse: setFrequencyShots,
      compareShotResponse: setCompareShots,
      fourFactorsResponse: setFourFactors,
      searchInProgress: setSearchInProgress,
      colorByFreq: setColorByFreq,
      invertColor: setInvertColor
    }),
    EffectsModule.forRoot([
      InitializeEffects,
      CSVEffect
    ])
  ],
  exports: [
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
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
    ColorSelectorComponent,
    FourFactorsComponent,
    FourFactorsOptionsComponent,
    FourFactorsPlayerSelectorComponent,
    FourFactorsTeamsSelectorComponent,
    FourFactorsSeasonSelectorComponent,
    FourFactorsTableComponent,
    FourFactorsThreeYearComponent,
    FourFactorsFiveYearComponent,
    FourFactorsThreeYearOptionsComponent,
    FourFactorsFiveYearOptionsComponent,
    FourFactorsThreeSeasonSelectorComponent,
    FourFactorsFiveSeasonSelectorComponent


  ],
  providers: [ShotchartService, DownloadCSV],
  bootstrap: [AppComponent]
})
export class AppModule {
}
