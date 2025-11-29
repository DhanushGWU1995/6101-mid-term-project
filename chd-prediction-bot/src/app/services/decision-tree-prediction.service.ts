import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PatientData } from '../models/patient-data.model';
import { PredictionResult } from '../models/prediction-result.model';
import { decisionTreeRules } from '../data/decision-tree-rules';

interface TreeNode {
  condition: string;
  outcome: string;
  probability: { yes: number; no: number };
  n: number;
  terminal?: boolean;
  children?: TreeNode[];
}

@Injectable({
  providedIn: 'root'
})
export class DecisionTreePredictionService {

  constructor() { }

  /**
   * Predict CHD using the static decision tree rules
   * @param patientData Patient information
   * @returns Observable with prediction result
   */
  public predictChd(patientData: PatientData): Observable<PredictionResult> {
    try {
      const result = this.traverseDecisionTree(patientData);
      return of(result);
    } catch (error) {
      console.error('Decision tree prediction error:', error);
      return of(this.getErrorResult());
    }
  }

  /**
   * Traverse the decision tree to find the prediction
   */
  private traverseDecisionTree(patientData: PatientData): PredictionResult {
    const rules = decisionTreeRules.rules;
    
    for (const rule of rules) {
      const result = this.evaluateNode(rule, patientData);
      if (result) {
        return result;
      }
    }

    // Fallback (should not reach here with complete tree)
    return this.getDefaultResult();
  }

  /**
   * Recursively evaluate a tree node
   */
  private evaluateNode(node: TreeNode, patientData: PatientData): PredictionResult | null {
    // Check if this node's condition matches
    if (!this.evaluateCondition(node.condition, patientData)) {
      return null;
    }

    // If this is a terminal node, return the prediction
    if (node.terminal) {
      return this.createPredictionResult(node, patientData);
    }

    // If not terminal, evaluate children
    if (node.children) {
      for (const child of node.children) {
        const result = this.evaluateNode(child, patientData);
        if (result) {
          return result;
        }
      }
    }

    // If we matched this node but no children matched (shouldn't happen with complete tree)
    // Return result for this node
    return this.createPredictionResult(node, patientData);
  }

  /**
   * Evaluate a condition string against patient data
   */
  private evaluateCondition(condition: string, patientData: PatientData): boolean {
    // Extract variable name and check type
    if (condition.includes(' in ')) {
      return this.evaluateInCondition(condition, patientData);
    } else if (condition.includes(' == ')) {
      return this.evaluateEqualityCondition(condition, patientData);
    } else if (condition.includes(' < ') || condition.includes(' >= ') || 
               condition.includes(' > ') || condition.includes(' <= ')) {
      return this.evaluateNumericCondition(condition, patientData);
    }
    return false;
  }

  /**
   * Evaluate "in" conditions like "Age in ['50-54', '55-59']"
   */
  private evaluateInCondition(condition: string, patientData: PatientData): boolean {
    const match = condition.match(/(\w+) in \[([^\]]+)\]/);
    if (!match) return false;

    const variable = match[1];
    const valuesStr = match[2];
    const values = valuesStr.split(',').map(v => v.trim().replace(/['"]/g, ''));

    const patientValue = this.getPatientValue(variable, patientData);
    return values.includes(patientValue);
  }

  /**
   * Evaluate equality conditions like "Age == '50-54'"
   */
  private evaluateEqualityCondition(condition: string, patientData: PatientData): boolean {
    const match = condition.match(/(\w+) == ['"]([^'"]+)['"]/);
    if (!match) return false;

    const variable = match[1];
    const value = match[2];

    const patientValue = this.getPatientValue(variable, patientData);
    return patientValue === value;
  }

  /**
   * Evaluate numeric comparison conditions like "BMI_Value < 21.7" or "BMI_Value >= 27.5"
   */
  private evaluateNumericCondition(condition: string, patientData: PatientData): boolean {
    // Match patterns like "BMI_Value < 21.7", "BMI_Value >= 27.5", etc.
    const match = condition.match(/(\w+)\s*(>=|<=|>|<)\s*([\d.]+)/);
    if (!match) return false;

    const variable = match[1];
    const operator = match[2];
    const threshold = parseFloat(match[3]);

    // Get the patient's BMI value
    const patientValueStr = this.getPatientValue(variable, patientData);
    const patientValue = parseFloat(patientValueStr);

    if (isNaN(patientValue) || isNaN(threshold)) {
      return false;
    }

    // Evaluate the comparison
    switch (operator) {
      case '<':
        return patientValue < threshold;
      case '<=':
        return patientValue <= threshold;
      case '>':
        return patientValue > threshold;
      case '>=':
        return patientValue >= threshold;
      default:
        return false;
    }
  }

  /**
   * Get patient value by variable name
   */
  private getPatientValue(variable: string, patientData: PatientData): string {
    const mapping: { [key: string]: string } = {
      'Age': patientData.age,
      'Sex': patientData.sex,
      'Smoking_Status': patientData.smokingStatus,
      'Diabetes_Status': patientData.diabetesStatus,
      'Exercise_Past_30_Days': patientData.exercisePast30Days,
      'General_Health_Status': patientData.generalHealthStatus,
      'BMI_Value': patientData.bmiValue.toString()
    };

    return mapping[variable] || '';
  }

  /**
   * Create prediction result from a tree node
   */
  private createPredictionResult(node: TreeNode, patientData: PatientData): PredictionResult {
    const probability = node.probability.yes;
    const hasChd = probability >= 0.5; // Decision threshold at 50%
    const riskLevel = this.calculateRiskLevel(probability);

    return {
      hasCoronaryHeartDisease: hasChd,
      probability: probability,
      message: this.generateMessage(probability, hasChd, patientData),
      riskLevel: riskLevel,
      decisionPath: node.outcome,
      sampleSize: node.n
    };
  }

  /**
   * Calculate risk level based on probability
   * Updated thresholds:
   * - Very Low: 0-29%
   * - Low: 30-40%
   * - Moderate: 40-60%
   * - High: 60-75%
   * - Very High: 75-100%
   */
  private calculateRiskLevel(probability: number): string {
    if (probability >= 0.75) return 'Very High';
    if (probability >= 0.60) return 'High';
    if (probability >= 0.40) return 'Moderate';
    if (probability >= 0.30) return 'Low';
    return 'Very Low';
  }

  /**
   * Generate personalized message
   */
  private generateMessage(probability: number, hasChd: boolean, patientData: PatientData): string {
    const probPercent = (probability * 100).toFixed(1);
    
    if (hasChd) {
      return `Based on the decision tree analysis, there is a ${probPercent}% probability of coronary heart disease. ` +
             `Please consult with a healthcare professional for proper evaluation and screening.`;
    } else {
      return `Based on the decision tree analysis, there is a ${probPercent}% probability of coronary heart disease. ` +
             `Your risk appears to be lower, but maintaining a healthy lifestyle is still important.`;
    }
  }

  /**
   * Get error result
   */
  private getErrorResult(): PredictionResult {
    return {
      hasCoronaryHeartDisease: false,
      probability: 0,
      message: 'Unable to make prediction. Please ensure all fields are filled correctly.',
      riskLevel: 'Unknown'
    };
  }

  /**
   * Get default result (fallback)
   */
  private getDefaultResult(): PredictionResult {
    return {
      hasCoronaryHeartDisease: false,
      probability: 0.5,
      message: 'Prediction completed with moderate confidence. Please consult a healthcare professional.',
      riskLevel: 'Moderate'
    };
  }
}
