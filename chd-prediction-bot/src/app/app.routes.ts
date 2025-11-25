import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PredictionFormComponent } from './components/prediction-form/prediction-form.component';
import { ResultDisplayComponent } from './components/result-display/result-display.component';
import { DecisionTreeVizComponent } from './components/decision-tree-viz/decision-tree-viz.component';
import { RfPredictionComponent } from './components/rf-prediction/rf-prediction.component';

const routes: Routes = [
  { path: '', redirectTo: '/predict', pathMatch: 'full' },
  { path: 'predict', component: PredictionFormComponent },
  { path: 'result', component: ResultDisplayComponent },
  { path: 'tree', component: DecisionTreeVizComponent },
  { path: 'rf-prediction', component: RfPredictionComponent },
  { path: '**', redirectTo: '/predict' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }