export interface PatientData {
  age: string;
  sex: 'Male' | 'Female' | '';
  smokingStatus: 'Yes' | 'No' | '';
  diabetesStatus: 'Yes' | 'Yes/borderline' | 'Yes/pregnancy only' | 'No' | '';
  exercisePast30Days: 'Yes' | 'No' | '';
  generalHealthStatus: 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor' | '';
  bmiValue: number;
}
