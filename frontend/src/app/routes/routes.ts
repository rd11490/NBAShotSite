import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RawShotChartComponent} from "../app-area/raw/raw_shot_chart.component";
import {FrequencyShotChartComponent} from "../app-area/frequency/frequency_shot_chart.component";
import {CompareShotChartComponent} from "../app-area/compare/compare_shot_chart.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'raw', component:  RawShotChartComponent},
  { path: 'frequency', component:  FrequencyShotChartComponent},
  { path: 'compare', component:  CompareShotChartComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutes {}
