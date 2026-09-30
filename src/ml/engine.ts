export interface PredictionResult {
  success_probability: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  estimated_processing_seconds: number;
  recommendation: string;
  network_status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  recent_failure_rate: number;
}

export function predictTransferHealth(
  destinationBank: string,
  amount: number,
  isNewBeneficiary: boolean
): PredictionResult {
  let success_probability = 0.94;
  let risk_level: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let estimated_processing_seconds = 8;
  let recommendation = "Good time to send.";
  let network_status: 'HEALTHY' | 'DEGRADED' | 'DOWN' = 'HEALTHY';
  let recent_failure_rate = 2.8;

  if (amount > 100000 && isNewBeneficiary) {
    risk_level = 'HIGH';
  } else if (amount > 50000) {
    risk_level = 'MEDIUM';
  }

  if (destinationBank === 'Bank X') {
    success_probability = 0.71;
    estimated_processing_seconds = 134; // 2m 14s
    network_status = 'DEGRADED';
    recent_failure_rate = 18.4;
    recommendation = "Transfers are currently experiencing delays.";
  } else if (destinationBank === 'UBA') {
    success_probability = 0.82;
    estimated_processing_seconds = 45;
    network_status = 'DEGRADED';
    recent_failure_rate = 8.1;
    recommendation = "Transfers are slower than usual.";
  } else if (destinationBank === 'Access Bank') {
    success_probability = 0.96;
    estimated_processing_seconds = 5;
    recent_failure_rate = 1.2;
  }

  return {
    success_probability,
    risk_level,
    estimated_processing_seconds,
    recommendation,
    network_status,
    recent_failure_rate
  };
}
