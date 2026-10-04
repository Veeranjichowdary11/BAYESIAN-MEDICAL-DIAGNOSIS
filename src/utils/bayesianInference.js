/**
 * Bayesian Inference Engine for Medical Diagnosis
 * Academic Implementation with Full Calculation Trace
 */

import { FLU_CPT, INFECTION_CPT, DIAGNOSIS_CPT, PRIORS } from '../data/cptData.js';

/**
 * Calculates Bayesian probabilities based on patient symptoms evidence
 * @param {Object} evidence - { fever: 'Yes'|'No', cough: 'Yes'|'No', fatigue: 'Yes'|'No' }
 * @returns {Object} Complete inference result with step-by-step trace and probabilities
 */
export function calculateBayesianInference(evidence) {
  const feverVal = evidence.fever || 'No';
  const coughVal = evidence.cough || 'No';
  const fatigueVal = evidence.fatigue || 'No';

  // 1. Look up conditional probability for Flu
  const fluRow = FLU_CPT.find(
    row => row.fever === feverVal && row.cough === coughVal && row.fatigue === fatigueVal
  );

  const pFluYes = fluRow ? fluRow.fluYes : 0.05;
  const pFluNo = fluRow ? fluRow.fluNo : 0.95;

  // 2. Look up conditional probability for Infection
  const infRow = INFECTION_CPT.find(
    row => row.fever === feverVal && row.cough === coughVal && row.fatigue === fatigueVal
  );

  const pInfYes = infRow ? infRow.infectionYes : 0.05;
  const pInfNo = infRow ? infRow.infectionNo : 0.95;

  // 3. Compute joint probabilities for intermediate layer combinations (Flu, Infection)
  // Since Flu and Infection are conditionally independent given observed symptoms:
  const jointProbs = [
    {
      flu: 'Yes',
      infection: 'Yes',
      prob: pFluYes * pInfYes,
      formula: `P(Flu=Yes|e) × P(Inf=Yes|e) = ${pFluYes.toFixed(2)} × ${pInfYes.toFixed(2)} = ${(pFluYes * pInfYes).toFixed(4)}`
    },
    {
      flu: 'Yes',
      infection: 'No',
      prob: pFluYes * pInfNo,
      formula: `P(Flu=Yes|e) × P(Inf=No|e) = ${pFluYes.toFixed(2)} × ${pInfNo.toFixed(2)} = ${(pFluYes * pInfNo).toFixed(4)}`
    },
    {
      flu: 'No',
      infection: 'Yes',
      prob: pFluNo * pInfYes,
      formula: `P(Flu=No|e) × P(Inf=Yes|e) = ${pFluNo.toFixed(2)} × ${pInfYes.toFixed(2)} = ${(pFluNo * pInfYes).toFixed(4)}`
    },
    {
      flu: 'No',
      infection: 'No',
      prob: pFluNo * pInfNo,
      formula: `P(Flu=No|e) × P(Inf=No|e) = ${pFluNo.toFixed(2)} × ${pInfNo.toFixed(2)} = ${(pFluNo * pInfNo).toFixed(4)}`
    }
  ];

  // 4. Compute Marginal Posterior Probabilities for each Diagnosis outcome
  // P(Diagnosis = d | e) = ∑_{flu, inf} P(Diagnosis = d | flu, inf) × P(flu, inf | e)
  let rawFluDiagnosis = 0;
  let rawInfectionDiagnosis = 0;
  let rawHealthyDiagnosis = 0;

  const stepDetails = [];

  jointProbs.forEach(joint => {
    const diagRow = DIAGNOSIS_CPT.find(
      d => d.flu === joint.flu && d.infection === joint.infection
    );

    if (diagRow) {
      const fluContribution = joint.prob * diagRow.fluDiagnosis;
      const infContribution = joint.prob * diagRow.infectionDiagnosis;
      const healthyContribution = joint.prob * diagRow.healthyDiagnosis;

      rawFluDiagnosis += fluContribution;
      rawInfectionDiagnosis += infContribution;
      rawHealthyDiagnosis += healthyContribution;

      stepDetails.push({
        state: `(Flu=${joint.flu}, Inf=${joint.infection})`,
        jointProb: joint.prob,
        cptFlu: diagRow.fluDiagnosis,
        cptInf: diagRow.infectionDiagnosis,
        cptHealthy: diagRow.healthyDiagnosis,
        fluContrib: fluContribution,
        infContrib: infContribution,
        healthyContrib: healthyContribution
      });
    }
  });

  // 5. Normalization step (ensures sum is exactly 1.0000 and 100%)
  const totalSum = rawFluDiagnosis + rawInfectionDiagnosis + rawHealthyDiagnosis;
  const safeSum = totalSum > 0 ? totalSum : 1.0;

  const normFlu = rawFluDiagnosis / safeSum;
  const normInf = rawInfectionDiagnosis / safeSum;
  const normHealthy = rawHealthyDiagnosis / safeSum;

  const pctFlu = Number((normFlu * 100).toFixed(2));
  const pctInf = Number((normInf * 100).toFixed(2));
  // Ensure the third makes the sum strictly 100.00% without rounding drift
  const pctHealthy = Number((100 - pctFlu - pctInf).toFixed(2));

  // Determine top diagnosis
  const outcomes = [
    { label: 'Flu', key: 'flu', prob: normFlu, percent: pctFlu, color: '#f43f5e', lightColor: '#ffe4e6', bgGradient: 'from-rose-500 to-red-600' },
    { label: 'Infection', key: 'infection', prob: normInf, percent: pctInf, color: '#8b5cf6', lightColor: '#ede9fe', bgGradient: 'from-purple-500 to-indigo-600' },
    { label: 'Healthy', key: 'healthy', prob: normHealthy, percent: pctHealthy, color: '#10b981', lightColor: '#d1fae5', bgGradient: 'from-emerald-500 to-teal-600' }
  ];

  outcomes.sort((a, b) => b.prob - a.prob);
  const mostLikely = outcomes[0];

  return {
    evidence: {
      fever: feverVal,
      cough: coughVal,
      fatigue: fatigueVal
    },
    priors: PRIORS,
    intermediate: {
      flu: {
        yes: pFluYes,
        no: pFluNo,
        yesPercent: Number((pFluYes * 100).toFixed(1)),
        noPercent: Number((pFluNo * 100).toFixed(1))
      },
      infection: {
        yes: pInfYes,
        no: pInfNo,
        yesPercent: Number((pInfYes * 100).toFixed(1)),
        noPercent: Number((pInfNo * 100).toFixed(1))
      }
    },
    jointProbs,
    stepDetails,
    rawProbabilities: {
      flu: rawFluDiagnosis,
      infection: rawInfectionDiagnosis,
      healthy: rawHealthyDiagnosis,
      sum: totalSum
    },
    normalizedProbabilities: {
      flu: normFlu,
      infection: normInf,
      healthy: normHealthy
    },
    percentages: {
      flu: pctFlu,
      infection: pctInf,
      healthy: pctHealthy
    },
    mostLikely,
    allOutcomes: outcomes,
    computedAt: new Date().toLocaleTimeString()
  };
}
