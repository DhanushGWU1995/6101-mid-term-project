// Example Angular Component for CHD Prediction
// File: src/app/components/rf-prediction/rf-prediction.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RfPredictionService, PredictionResponse } from '../../services/rf-prediction.service';

@Component({
  selector: 'app-rf-prediction',
  templateUrl: './rf-prediction.component.html',
  styleUrls: ['./rf-prediction.component.scss']
})
export class RfPredictionComponent implements OnInit {
  predictionForm: FormGroup;
  prediction: PredictionResponse | null = null;
  loading = false;
  error: string | null = null;

  // Form options
  ageGroups = ['18-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69'];
  sexOptions = ['Male', 'Female'];
  yesNoOptions = ['Yes', 'No'];
  diabetesOptions = ['Yes', 'Yes/borderline', 'Yes/pregnancy only', 'No'];
  healthOptions = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];

  constructor(
    private fb: FormBuilder,
    private rfService: RfPredictionService
  ) {
    this.predictionForm = this.fb.group({
      Age: ['', Validators.required],
      Sex: ['', Validators.required],
      Smoking_Status: ['', Validators.required],
      Diabetes_Status: ['', Validators.required],
      Exercise_Past_30_Days: ['', Validators.required],
      General_Health_Status: ['', Validators.required],
      BMI_Value: ['', [Validators.required, Validators.min(10), Validators.max(70)]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.predictionForm.valid) {
      this.loading = true;
      this.error = null;
      this.prediction = null;

      this.rfService.predictCHD(this.predictionForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            this.prediction = response;
          } else {
            this.error = response.error || 'Prediction failed';
          }
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Failed to connect to prediction API. Please ensure the API is running.';
          console.error('Prediction error:', err);
        }
      });
    }
  }

  getRiskColor(): string {
    if (this.prediction?.prediction.risk_level) {
      return this.rfService.getRiskColor(this.prediction.prediction.risk_level);
    }
    return '#6b7280';
  }

  resetForm(): void {
    this.predictionForm.reset();
    this.prediction = null;
    this.error = null;
  }
}
