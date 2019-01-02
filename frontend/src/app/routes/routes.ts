import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RawShotChartComponent} from "../app-area/pages/raw_shot_chart.component";
import {FrequencyShotChartComponent} from "../app-area/pages/frequency_shot_chart.component";
import {CompareShotChartComponent} from "../app-area/pages/compare_shot_chart.component";
import {HomeComponent} from "../app-area/pages/home.component";
import {FourFactorsComponent} from "../app-area/pages/four_factors.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'raw', component: RawShotChartComponent},
  {path: 'frequency', component: FrequencyShotChartComponent},
  {path: 'zoned', component: FrequencyShotChartComponent},
  {path: 'compare', component: CompareShotChartComponent},
  {path: 'fourfactors', component: FourFactorsComponent},
  {path: 'rapm', component: FourFactorsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {
}
