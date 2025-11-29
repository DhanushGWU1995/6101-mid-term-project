export interface PredictionResult {
  hasCoronaryHeartDisease: boolean;
  probability: number;
  message: string;
  riskLevel?: string;
  decisionPath?: string;
  sampleSize?: number;
}
