import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { PredictionFormComponent } from './components/prediction-form/prediction-form.component';
import { ResultDisplayComponent } from './components/result-display/result-display.component';
import { DecisionTreeVizComponent } from './components/decision-tree-viz/decision-tree-viz.component';
import { DecisionTreePredictionService } from './services/decision-tree-prediction.service';

@NgModule({
  declarations: [
    AppComponent,
    PredictionFormComponent,
    ResultDisplayComponent,
    DecisionTreeVizComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    DecisionTreePredictionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
