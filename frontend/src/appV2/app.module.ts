import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {AppRoutes} from "./routes/routes";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgSelectModule} from "@ng-select/ng-select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTabsModule} from "@angular/material/tabs";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ShotchartService} from "./shotchart.service";
import {DownloadCSV} from "./services/download_csv.service";
import {RawShotChartComponent} from "./raw/raw_shot_chart.component";
import {LoadingComponent} from "./home/loading.component";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    RawShotChartComponent,
    LoadingComponent
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
    MatPaginatorModule
  ],
  imports: [
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
    MatPaginatorModule
  ],
  providers: [ShotchartService, DownloadCSV],
})
export class AppModule {
}
