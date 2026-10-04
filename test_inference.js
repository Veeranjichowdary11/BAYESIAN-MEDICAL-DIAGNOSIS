import { calculateBayesianInference } from './src/utils/bayesianInference.js';
import { SAMPLE_PATIENTS } from './src/data/cptData.js';

console.log('================================================================');
console.log('TESTING BAYESIAN NETWORK FOR INTELLIGENT MEDICAL DIAGNOSIS');
console.log('================================================================\n');

let allPassed = true;

SAMPLE_PATIENTS.forEach(patient => {
  const res = calculateBayesianInference({
    fever: patient.fever,
    cough: patient.cough,
    fatigue: patient.fatigue
  });

  console.log(`--- ${patient.name} ---`);
  console.log(`Input Evidence: Fever=${res.evidence.fever}, Cough=${res.evidence.cough}, Fatigue=${res.evidence.fatigue}`);
  console.log(`Intermediate Beliefs: P(Flu=Yes)=${res.intermediate.flu.yesPercent}%, P(Inf=Yes)=${res.intermediate.infection.yesPercent}%`);
  console.log(`Posterior Diagnosis: Flu=${res.percentages.flu}%, Infection=${res.percentages.infection}%, Healthy=${res.percentages.healthy}%`);
  console.log(`Most Likely: ${res.mostLikely.label.toUpperCase()} (${res.mostLikely.percent}%)`);

  const sum = res.percentages.flu + res.percentages.infection + res.percentages.healthy;
  console.log(`Sum of Probabilities: ${sum.toFixed(2)}%`);

  if (Math.abs(sum - 100.00) > 0.01) {
    console.error(`FAIL: Sum does not equal 100% (got ${sum})`);
    allPassed = false;
  } else {
    console.log('PASS: Valid probability distribution\n');
  }
});

// Test all 8 symptom combinations (2^3)
console.log('--- Testing All 8 Symptom Permutations (2^3 Exhaustive) ---');
const bools = ['Yes', 'No'];
let count = 0;
for (const fever of bools) {
  for (const cough of bools) {
    for (const fatigue of bools) {
      count++;
      const res = calculateBayesianInference({ fever, cough, fatigue });
      const sum = Number((res.percentages.flu + res.percentages.infection + res.percentages.healthy).toFixed(2));
      if (isNaN(sum) || sum < 99.99 || sum > 100.01) {
        console.error(`FAIL at perm ${fever},${cough},${fatigue}: sum=${sum}`);
        allPassed = false;
      }
    }
  }
}

console.log(`All ${count} permutations tested successfully!`);
console.log(`Overall Test Status: ${allPassed ? 'ALL TESTS PASSED ✅' : 'FAILED ❌'}`);
