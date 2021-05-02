import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {RawShotChartComponent} from "../raw/raw_shot_chart.component";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'raw', component: RawShotChartComponent},
  // {path: 'frequency', component: FrequencyShotChartComponent},
  // {path: 'zoned', component: FrequencyShotChartComponent},
  // {path: 'compare', component: CompareShotChartComponent},
  // {path: 'fourfactors', component: FourFactorsComponent},
  // {path: 'rapm', component: FourFactorsComponent},
  // {path: 'rapm3', component: FourFactorsThreeYearComponent},
  // {path: 'rapm5', component: FourFactorsFiveYearComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {
}
