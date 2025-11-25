import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { PredictionFormComponent } from './components/prediction-form/prediction-form.component';
import { ResultDisplayComponent } from './components/result-display/result-display.component';
import { DecisionTreeVizComponent } from './components/decision-tree-viz/decision-tree-viz.component';
import { RfPredictionComponent } from './components/rf-prediction/rf-prediction.component';
import { ChdPredictionService } from './services/chd-prediction.service';
import { RfPredictionService } from './services/rf-prediction.service';

@NgModule({
  declarations: [
    AppComponent,
    PredictionFormComponent,
    ResultDisplayComponent,
    DecisionTreeVizComponent,
    RfPredictionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ChdPredictionService,
    RfPredictionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
