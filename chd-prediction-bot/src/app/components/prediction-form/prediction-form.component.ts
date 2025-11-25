import { Component } from '@angular/core';
import { ChdPredictionService } from '../../services/chd-prediction.service';
import { PatientData } from '../../models/patient-data.model';
import { PredictionResult } from '../../models/prediction-result.model';

@Component({
  selector: 'app-prediction-form',
  templateUrl: './prediction-form.component.html',
  styleUrls: ['./prediction-form.component.scss']
})
export class PredictionFormComponent {
  currentStep = 0;
  totalSteps = 7;
  
  patientData: PatientData = {
    age: '',
    sex: '',
    smokingStatus: '',
    diabetesStatus: '',
    exercisePast30Days: '',
    generalHealthStatus: '',
    bmiValue: 25
  };

  predictionResult: PredictionResult | null = null;
  showResult = false;

  questions = [
    {
      field: 'age',
      question: 'What is your age group?',
      icon: '🎂',
      options: [
        { value: '18-24', label: '18-24' },
        { value: '25-29', label: '25-29' },
        { value: '30-34', label: '30-34' },
        { value: '35-39', label: '35-39' },
        { value: '40-44', label: '40-44' },
        { value: '45-49', label: '45-49' },
        { value: '50-54', label: '50-54' },
        { value: '55-59', label: '55-59' },
        { value: '60-64', label: '60-64' },
        { value: '65-69', label: '65-69' }
      ]
    },
    {
      field: 'sex',
      question: 'What is your biological sex?',
      icon: '👤',
      options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
      ]
    },
    {
      field: 'generalHealthStatus',
      question: 'How would you rate your general health?',
      icon: '❤️',
      options: [
        { value: 'Excellent', label: 'Excellent' },
        { value: 'Very Good', label: 'Very Good' },
        { value: 'Good', label: 'Good' },
        { value: 'Fair', label: 'Fair' },
        { value: 'Poor', label: 'Poor' }
      ]
    },
    {
      field: 'diabetesStatus',
      question: 'Have you ever been told you have diabetes?',
      icon: '💉',
      options: [
        { value: 'No', label: 'No' },
        { value: 'Yes', label: 'Yes' },
        { value: 'Yes/borderline', label: 'Yes, borderline or pre-diabetes' },
        { value: 'Yes/pregnancy only', label: 'Yes, during pregnancy only' }
      ]
    },
    {
      field: 'smokingStatus',
      question: 'Have you smoked at least 100 cigarettes in your entire life?',
      icon: '🚭',
      options: [
        { value: 'No', label: 'No' },
        { value: 'Yes', label: 'Yes' }
      ]
    },
    {
      field: 'exercisePast30Days',
      question: 'Did you do any physical activity or exercise in the past 30 days?',
      icon: '🏃',
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      field: 'bmiValue',
      question: 'What is your Body Mass Index (BMI)?',
      icon: '⚖️',
      type: 'slider',
      min: 10,
      max: 70,
      step: 0.1,
      options: [] // Slider doesn't use options
    }
  ];

  constructor(private chdPredictionService: ChdPredictionService) {}

  selectOption(value: string) {
    const currentQuestion = this.questions[this.currentStep];
    (this.patientData as any)[currentQuestion.field] = value;

    // Move to next step or show results
    setTimeout(() => {
      if (this.currentStep < this.totalSteps - 1) {
        this.currentStep++;
      } else {
        this.predictCHD();
      }
    }, 300);
  }

  predictCHD() {
    this.chdPredictionService.predictChd(this.patientData).subscribe({
      next: (result) => {
        this.predictionResult = result;
        this.showResult = true;
      },
      error: (error) => {
        console.error('Prediction error:', error);
        this.predictionResult = {
          hasCoronaryHeartDisease: false,
          probability: 0,
          message: 'Error connecting to prediction API. Please ensure the R API server is running.',
          riskLevel: 'Unknown'
        };
        this.showResult = true;
      }
    });
  }

  getSelectedValue(field: string): string {
    // Handle BMI value specially - check if it's been set (not default 25)
    if (field === 'bmiValue') {
      return this.currentStep >= 6 ? this.patientData.bmiValue.toString() : '';
    }
    return (this.patientData as any)[field];
  }

  getQuestionLabel(field: string): string {
    const question = this.questions.find(q => q.field === field);
    return question ? question.question : '';
  }

  getOptionLabel(field: string, value: string): string {
    // Handle BMI value separately
    if (field === 'bmiValue') {
      return this.patientData.bmiValue.toString();
    }
    
    const question = this.questions.find(q => q.field === field);
    if (!question) return value;
    
    const option = question.options.find(opt => opt.value === value);
    return option ? option.label : value;
  }

  restart() {
    this.currentStep = 0;
    this.showResult = false;
    this.predictionResult = null;
    this.patientData = {
      age: '',
      sex: 'Male',
      smokingStatus: '',
      diabetesStatus: '',
      exercisePast30Days: '',
      generalHealthStatus: '',
      bmiValue: 25
    };
  }
  
  changeAnswers() {
    // Go back to the beginning but keep the current answers
    this.currentStep = 0;
    this.showResult = false;
    this.predictionResult = null;
    // Patient data is preserved, allowing users to modify their previous answers
  }
  
  onSliderChange(value: number) {
    this.patientData.bmiValue = parseFloat(value.toFixed(1));
  }
  
  submitBMI() {
    // Move to prediction after BMI is set
    setTimeout(() => {
      this.predictCHD();
    }, 300);
  }
  
  getBMICategory(bmi: number): string {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    if (bmi < 35) return 'Obese Class I';
    if (bmi < 40) return 'Obese Class II';
    return 'Obese Class III';
  }

  goBack() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
}
