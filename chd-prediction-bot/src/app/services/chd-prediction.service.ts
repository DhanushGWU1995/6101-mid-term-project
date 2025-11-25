import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PatientData } from '../models/patient-data.model';
import { PredictionResult } from '../models/prediction-result.model';
import { environment } from '../../environments/environment';

interface RfApiResponse {
  success: boolean;
  prediction: {
    chd_probability: number;
    risk_level: string;
    has_chd: boolean;
  };
  input: any;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChdPredictionService {
  // Use environment-based API URL
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log('Using API URL:', this.apiUrl);
  }

  public predictChd(patientData: PatientData): Observable<PredictionResult> {
    // Build query parameters for R API
    const params = new HttpParams()
      .set('Age', patientData.age)
      .set('Sex', patientData.sex)
      .set('Smoking_Status', patientData.smokingStatus)
      .set('Diabetes_Status', patientData.diabetesStatus)
      .set('Exercise_Past_30_Days', patientData.exercisePast30Days)
      .set('General_Health_Status', patientData.generalHealthStatus)
      .set('BMI_Value', patientData.bmiValue.toString());

    // Call R API
    return this.http.post<RfApiResponse>(`${this.apiUrl}/predict`, null, { params })
      .pipe(
        map(response => this.mapApiResponse(response, patientData)),
        catchError(error => {
          console.error('API Error:', error);
          return of(this.getErrorResult(error));
        })
      );
  }

  private mapApiResponse(response: RfApiResponse, patientData: PatientData): PredictionResult {
    if (!response.success) {
      return this.getErrorResult(response.error || 'Prediction failed');
    }

    return {
      hasCoronaryHeartDisease: response.prediction.has_chd,
      probability: response.prediction.chd_probability / 100, // Convert to decimal
      message: this.generateMessage(response.prediction, patientData),
      riskLevel: response.prediction.risk_level
    };
  }

  private estimateBMI(patientData: PatientData): number {
    // Estimate BMI based on general health status and age
    // This is a rough estimate - in a real app, you'd ask for height/weight
    const baselineByHealth: { [key: string]: number } = {
      'Excellent': 23,
      'Very Good': 25,
      'Good': 27,
      'Fair': 29,
      'Poor': 31
    };

    let bmi = baselineByHealth[patientData.generalHealthStatus] || 27;

    // Adjust for diabetes
    if (patientData.diabetesStatus === 'Yes' || patientData.diabetesStatus === 'Yes/borderline') {
      bmi += 2;
    }

    // Adjust for exercise
    if (patientData.exercisePast30Days === 'No') {
      bmi += 1.5;
    }

    return Math.min(Math.max(bmi, 18), 40); // Keep within reasonable range
  }

  private generateMessage(prediction: any, patientData: PatientData): string {
    const riskLevel = prediction.risk_level;
    const probability = prediction.chd_probability;
    const hasCHD = prediction.has_chd;

    let message = `Your CHD risk assessment shows a ${probability.toFixed(1)}% probability. `;

    // Add threshold explanation
    if (hasCHD) {
      message += `This exceeds the 10% clinical threshold for elevated cardiovascular risk. `;
    } else {
      message += `This is below the 10% clinical threshold, indicating standard risk levels. `;
    }

    switch (riskLevel) {
      case 'Low':
        message += 'Your profile indicates low risk. Continue maintaining your healthy lifestyle with regular exercise and good health habits. ';
        break;
      case 'Moderate':
        message += 'Your profile shows moderate risk. Consider discussing preventive measures with your healthcare provider, including lifestyle modifications and regular health screenings. ';
        break;
      case 'High':
        message += 'Your profile indicates elevated risk. It\'s important to consult with a healthcare professional for a comprehensive evaluation and to discuss risk reduction strategies. ';
        break;
      case 'Very High':
        message += 'Your profile shows very high risk. We strongly recommend scheduling an appointment with a healthcare provider as soon as possible for a thorough cardiovascular assessment. ';
        break;
      default:
        message += 'Please consult with a healthcare professional to discuss your cardiovascular health. ';
    }

    message += '\n\n📊 Model Details: This prediction comes from a Random Forest classifier trained on 210,428 CDC BRFSS 2024 records with an Out-of-Bag error rate of 3.2% (Brier score), indicating excellent calibration. The model uses 7 health indicators and 500 decision trees.';
    message += '\n\n⚕️ Important: This is a statistical risk assessment tool, not a diagnostic instrument. Always consult qualified healthcare professionals for medical decisions.';

    return message;
  }

  private getErrorResult(error: any): PredictionResult {
    return {
      hasCoronaryHeartDisease: false,
      probability: 0,
      message: `Unable to get prediction from API: ${error}. Please ensure the R API server is running on port 8000.`,
      riskLevel: 'Unknown'
    };
  }
}
