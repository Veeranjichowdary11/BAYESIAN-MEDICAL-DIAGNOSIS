/**
 * Bayesian Network Conditional Probability Tables (CPT) & Structure Data
 * Academic College Project: Bayesian Network for Intelligent Medical Diagnosis
 */

export const PRIORS = {
  fever: {
    yes: 0.30,
    no: 0.70
  },
  cough: {
    yes: 0.40,
    no: 0.60
  },
  fatigue: {
    yes: 0.35,
    no: 0.65
  }
};

/**
 * FLU CPT
 * P(Flu | Fever, Cough, Fatigue)
 */
export const FLU_CPT = [
  { fever: 'Yes', cough: 'Yes', fatigue: 'Yes', fluYes: 0.90, fluNo: 0.10 },
  { fever: 'Yes', cough: 'Yes', fatigue: 'No',  fluYes: 0.80, fluNo: 0.20 },
  { fever: 'Yes', cough: 'No',  fatigue: 'Yes', fluYes: 0.75, fluNo: 0.25 },
  { fever: 'Yes', cough: 'No',  fatigue: 'No',  fluYes: 0.55, fluNo: 0.45 },
  { fever: 'No',  cough: 'Yes', fatigue: 'Yes', fluYes: 0.60, fluNo: 0.40 },
  { fever: 'No',  cough: 'Yes', fatigue: 'No',  fluYes: 0.35, fluNo: 0.65 },
  { fever: 'No',  cough: 'No',  fatigue: 'Yes', fluYes: 0.25, fluNo: 0.75 },
  { fever: 'No',  cough: 'No',  fatigue: 'No',  fluYes: 0.05, fluNo: 0.95 }
];

/**
 * INFECTION CPT
 * P(Infection | Fever, Cough, Fatigue)
 */
export const INFECTION_CPT = [
  { fever: 'Yes', cough: 'Yes', fatigue: 'Yes', infectionYes: 0.80, infectionNo: 0.20 },
  { fever: 'Yes', cough: 'Yes', fatigue: 'No',  infectionYes: 0.75, infectionNo: 0.25 },
  { fever: 'Yes', cough: 'No',  fatigue: 'Yes', infectionYes: 0.70, infectionNo: 0.30 },
  { fever: 'Yes', cough: 'No',  fatigue: 'No',  infectionYes: 0.50, infectionNo: 0.50 },
  { fever: 'No',  cough: 'Yes', fatigue: 'Yes', infectionYes: 0.55, infectionNo: 0.45 },
  { fever: 'No',  cough: 'Yes', fatigue: 'No',  infectionYes: 0.30, infectionNo: 0.70 },
  { fever: 'No',  cough: 'No',  fatigue: 'Yes', infectionYes: 0.20, infectionNo: 0.80 },
  { fever: 'No',  cough: 'No',  fatigue: 'No',  infectionYes: 0.05, infectionNo: 0.95 }
];

/**
 * DIAGNOSIS CPT
 * P(Diagnosis | Flu, Infection)
 */
export const DIAGNOSIS_CPT = [
  { flu: 'Yes', infection: 'Yes', fluDiagnosis: 0.60, infectionDiagnosis: 0.35, healthyDiagnosis: 0.05 },
  { flu: 'Yes', infection: 'No',  fluDiagnosis: 0.90, infectionDiagnosis: 0.05, healthyDiagnosis: 0.05 },
  { flu: 'No',  infection: 'Yes', fluDiagnosis: 0.05, infectionDiagnosis: 0.90, healthyDiagnosis: 0.05 },
  { flu: 'No',  infection: 'No',  fluDiagnosis: 0.02, infectionDiagnosis: 0.03, healthyDiagnosis: 0.95 }
];

/**
 * Sample test cases requested in the project specification
 */
export const SAMPLE_PATIENTS = [
  {
    id: 1,
    name: 'Patient 1 (Severe Multi-Symptom)',
    fever: 'Yes',
    cough: 'Yes',
    fatigue: 'Yes',
    description: 'Presents with all major acute symptoms (Fever, Cough, and Fatigue). Expected high probability of Flu / Infection.',
    tag: 'All Symptoms Active'
  },
  {
    id: 2,
    name: 'Patient 2 (Isolated Cough)',
    fever: 'No',
    cough: 'Yes',
    fatigue: 'No',
    description: 'Presents only with Cough without Fever or Fatigue. Expected highest probability of Healthy / Mild.',
    tag: 'Single Mild Symptom'
  },
  {
    id: 3,
    name: 'Patient 3 (Fever & Fatigue)',
    fever: 'Yes',
    cough: 'No',
    fatigue: 'Yes',
    description: 'Presents with high Fever and systemic Fatigue, but no active respiratory Cough.',
    tag: 'Fever & Fatigue'
  },
  {
    id: 4,
    name: 'Patient 4 (Asymptomatic Baseline)',
    fever: 'No',
    cough: 'No',
    fatigue: 'No',
    description: 'No symptoms present. Baseline prior check where Healthy probability should be highest.',
    tag: 'No Symptoms'
  }
];

export const NETWORK_NODES = {
  inputs: [
    { id: 'fever', label: 'Fever', type: 'input', icon: 'Thermometer' },
    { id: 'cough', label: 'Cough', type: 'input', icon: 'Wind' },
    { id: 'fatigue', label: 'Fatigue', type: 'input', icon: 'ZapOff' }
  ],
  intermediates: [
    { id: 'flu', label: 'Flu', type: 'intermediate', icon: 'Activity' },
    { id: 'infection', label: 'Infection', type: 'intermediate', icon: 'ShieldAlert' }
  ],
  output: { id: 'diagnosis', label: 'Diagnosis', type: 'output', icon: 'Stethoscope' }
};

export const VIVA_QUESTIONS = [
  {
    q: 'What is a Bayesian Network and why is it used in AI?',
    a: 'A Bayesian Network (or Belief Network) is a Directed Acyclic Graph (DAG) that represents a set of random variables and their conditional dependencies via edges. It is widely used in AI for probabilistic reasoning under uncertainty, decision support, and diagnosis.'
  },
  {
    q: 'What is a Conditional Probability Table (CPT)?',
    a: 'A CPT specifies the probability distribution of a node given each combination of values of its parent nodes. For a node with k binary parents, the CPT contains 2^k conditional probability distributions.'
  },
  {
    q: 'How is Bayesian inference computed in this 3-layer network?',
    a: '1. The input symptoms (Fever, Cough, Fatigue) provide observed evidence e.\n2. We look up P(Flu | e) and P(Infection | e) from their respective CPTs.\n3. We compute the joint intermediate distribution P(Flu, Infection | e) = P(Flu | e) × P(Infection | e).\n4. We compute the posterior diagnosis distribution P(Diagnosis = d | e) = ∑_{Flu, Infection} P(Diagnosis = d | Flu, Infection) × P(Flu, Infection | e).'
  },
  {
    q: 'Why do intermediate nodes have conditional independence?',
    a: 'In this DAG structure, given the state of all parent nodes (Fever, Cough, Fatigue), Flu and Infection are conditionally independent because their common causes are fully observed (d-separation principle).'
  },
  {
    q: 'Why must probabilities be normalized?',
    a: 'Because the output space {Flu, Infection, Healthy} represents a mutually exclusive and exhaustive set of diagnostic states for this simulator, the sum of all state probabilities must equal exactly 1.0 (or 100%).'
  }
];
