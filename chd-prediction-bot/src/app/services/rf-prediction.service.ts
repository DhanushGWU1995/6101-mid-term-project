// Angular Service for Random Forest CHD Prediction API
// File: src/app/services/rf-prediction.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PatientData {
  Age: string;
  Sex: string;
  Smoking_Status: string;
  Diabetes_Status: string;
  Exercise_Past_30_Days: string;
  General_Health_Status: string;
  BMI_Value: number;
}

export interface PredictionResponse {
  success: boolean;
  prediction: {
    chd_probability: number;
    risk_level: string;
    has_chd: boolean;
  };
  input: PatientData;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RfPredictionService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  predictCHD(patientData: PatientData): Observable<PredictionResponse> {
    const params = new URLSearchParams();
    params.append('Age', patientData.Age);
    params.append('Sex', patientData.Sex);
    params.append('Smoking_Status', patientData.Smoking_Status);
    params.append('Diabetes_Status', patientData.Diabetes_Status);
    params.append('Exercise_Past_30_Days', patientData.Exercise_Past_30_Days);
    params.append('General_Health_Status', patientData.General_Health_Status);
    params.append('BMI_Value', patientData.BMI_Value.toString());

    return this.http.post<PredictionResponse>(
      `${this.apiUrl}/predict?${params.toString()}`,
      {}
    );
  }

  getRiskColor(riskLevel: string): string {
    const colors: { [key: string]: string } = {
      'Low': '#22c55e',
      'Moderate': '#eab308',
      'High': '#f97316',
      'Very High': '#ef4444'
    };
    return colors[riskLevel] || '#6b7280';
  }
}
