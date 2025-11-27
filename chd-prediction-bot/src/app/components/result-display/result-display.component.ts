import { Component, Input } from '@angular/core';
import { PredictionResult } from '../../models/prediction-result.model';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.scss']
})
export class ResultDisplayComponent {
  @Input() predictionResult!: PredictionResult;

  get riskClass(): string {
    // Use the riskLevel from the decision tree service if available
    if (this.predictionResult.riskLevel) {
      const level = this.predictionResult.riskLevel.toLowerCase();
      if (level.includes('very low')) return 'very-low-risk';
      if (level.includes('low')) return 'low-risk';
      if (level.includes('moderate')) return 'moderate-risk';
      if (level.includes('high') && !level.includes('very')) return 'high-risk';
      if (level.includes('very high')) return 'very-high-risk';
    }
    
    // Fallback to probability-based classification
    // Updated thresholds: Very Low (0-29%), Low (30-40%), Moderate (40-60%), High (60-75%), Very High (75%+)
    const probability = this.predictionResult.probability * 100;
    
    if (probability < 30) {
      return 'very-low-risk';  // Green (0-29%)
    } else if (probability < 40) {
      return 'low-risk';        // Light Green (30-40%)
    } else if (probability < 60) {
      return 'moderate-risk';   // Yellow/Orange (40-60%)
    } else if (probability < 75) {
      return 'high-risk';       // Orange/Red (60-75%)
    } else {
      return 'very-high-risk';  // Deep Red (75%+)
    }
  }
  
  get riskEmoji(): string {
    const probability = this.predictionResult.probability * 100;
    
    if (probability < 30) {
      return '✅';  // Very Low
    } else if (probability < 40) {
      return '😊';  // Low
    } else if (probability < 60) {
      return '⚠️';  // Moderate
    } else if (probability < 75) {
      return '🔴';  // High
    } else {
      return '🚨';  // Very High
    }
  }
  
  get riskLabel(): string {
    // Use the riskLevel from decision tree service if available
    if (this.predictionResult.riskLevel) {
      return this.predictionResult.riskLevel.toUpperCase() + ' RISK';
    }
    
    // Fallback to probability-based labels
    const probability = this.predictionResult.probability * 100;
    
    if (probability < 30) {
      return 'VERY LOW RISK';
    } else if (probability < 40) {
      return 'LOW RISK';
    } else if (probability < 60) {
      return 'MODERATE RISK';
    } else if (probability < 75) {
      return 'HIGH RISK';
    } else {
      return 'VERY HIGH RISK';
    }
  }

  getModelConfidence(): string {
    // Decision Tree model based on matched case-control design (n=15,238)
    // 3-way matching: State + Age + Sex
    // Model accuracy: 66.6%, Sensitivity: 64.0%, Specificity: 69.2%
    const probability = this.predictionResult.probability * 100;
    
    if (probability < 30 || probability > 70) {
      // High confidence in extreme predictions
      return 'High (Acc: 66.6%)';
    } else if (probability >= 30 && probability < 45) {
      // Moderate confidence in low-moderate range
      return 'Moderate (Acc: 66.6%)';
    } else if (probability >= 45 && probability < 55) {
      // Lower confidence in borderline cases
      return 'Borderline (Acc: 66.6%)';
    } else {
      // Moderate-high confidence
      return 'Moderate-High (Acc: 66.6%)';
    }
  }

  getRiskBarWidth(): number {
    // Scale the probability from 0-100% to the visual bar (Low to High)
    // Decision tree probabilities range from ~8% to ~95%
    const probability = this.predictionResult.probability * 100;
    
    // For visual clarity, map the full 0-100% range
    // The bar represents the relative risk from Low (left) to High (right)
    return Math.min(probability, 100);
  }
  
  get sampleSize(): number {
    return this.predictionResult.sampleSize || 0;
  }
  
  get decisionPath(): string {
    return this.predictionResult.decisionPath || 'N/A';
  }
}
