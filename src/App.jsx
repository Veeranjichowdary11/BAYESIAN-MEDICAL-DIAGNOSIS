import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Activity, 
  Cpu, 
  Sparkles, 
  HeartPulse, 
  ShieldCheck, 
  Layers, 
  BarChart, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Calculator
} from 'lucide-react';

import { Header } from './components/Header';
import { SymptomInput } from './components/SymptomInput';
import { BayesianNetwork } from './components/BayesianNetwork';
import { DiagnosisResult } from './components/DiagnosisResult';
import { ProbabilityChart } from './components/ProbabilityChart';
import { SampleCases } from './components/SampleCases';
import { ProbabilityDetails } from './components/ProbabilityDetails';
import { AboutBayesian } from './components/AboutBayesian';
import { ReportModal } from './components/ReportModal';

import { calculateBayesianInference } from './utils/bayesianInference';

const DEFAULT_SYMPTOMS = {
  fever: 'Yes',
  cough: 'Yes',
  fatigue: 'Yes'
};

export default function App() {
  const [symptoms, setSymptoms] = useState(DEFAULT_SYMPTOMS);
  const [inferenceResult, setInferenceResult] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Compute inference dynamically whenever symptoms change
  const runInference = (currentEvidence) => {
    const result = calculateBayesianInference(currentEvidence);
    setInferenceResult(result);
    return result;
  };

  useEffect(() => {
    runInference(symptoms);
  }, []);

  const handleSymptomChange = (symptomKey, value) => {
    const updated = {
      ...symptoms,
      [symptomKey]: value
    };
    setSymptoms(updated);
    runInference(updated);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = runInference(symptoms);
      setIsAnalyzing(false);

      // Trigger subtle celebratory confetti for high confidence or completed inference
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // Confetti fallback
      }
    }, 250);
  };

  const handleReset = () => {
    const resetState = {
      fever: 'No',
      cough: 'No',
      fatigue: 'No'
    };
    setSymptoms(resetState);
    runInference(resetState);
  };

  const handleLoadCase = (patient) => {
    const newSymptoms = {
      fever: patient.fever,
      cough: patient.cough,
      fatigue: patient.fatigue
    };
    setSymptoms(newSymptoms);
    const res = runInference(newSymptoms);
    // Switch to dashboard tab if on other tab
    setActiveTab('dashboard');
  };

  const activeSymptomsCount = Object.values(symptoms).filter(v => v === 'Yes').length;

  return (
    <div className="app-wrapper">
      {/* Top Navigation & Academic Disclaimer */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReset={handleReset}
        onOpenReport={() => setIsReportOpen(true)}
      />

      <main className="main-content">
        {/* Top 3 Overview KPI Summary Cards */}
        <div className="top-stats-grid">
          {/* Card 1: Patient Evidence */}
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              <Activity size={26} />
            </div>
            <div className="stat-info">
              <h3>Observed Evidence</h3>
              <div className="stat-value">{activeSymptomsCount} / 3 Symptoms</div>
              <div className="stat-desc">
                {activeSymptomsCount === 0
                  ? 'Asymptomatic (All No)'
                  : Object.entries(symptoms)
                      .filter(([_, v]) => v === 'Yes')
                      .map(([k]) => k.toUpperCase())
                      .join(' • ')}
              </div>
            </div>
          </div>

          {/* Card 2: Bayesian Intermediate Belief */}
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
              <Cpu size={26} />
            </div>
            <div className="stat-info">
              <h3>Intermediate Beliefs</h3>
              <div className="stat-value">
                Flu: {inferenceResult ? inferenceResult.intermediate.flu.yesPercent : 0}%
              </div>
              <div className="stat-desc">
                Infection: {inferenceResult ? inferenceResult.intermediate.infection.yesPercent : 0}% • D-separated
              </div>
            </div>
          </div>

          {/* Card 3: Top Classification Outcome */}
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <HeartPulse size={26} />
            </div>
            <div className="stat-info">
              <h3>Primary Diagnosis</h3>
              <div className="stat-value" style={{ color: inferenceResult?.mostLikely?.color }}>
                {inferenceResult?.mostLikely?.label?.toUpperCase() || 'HEALTHY'}
              </div>
              <div className="stat-desc">
                Confidence: {inferenceResult?.mostLikely?.percent || 0}% Posterior Prob
              </div>
            </div>
          </div>
        </div>

        {/* Tab 1: Main Interactive Dashboard */}
        {activeTab === 'dashboard' && (
          <>
            <div className="dashboard-grid">
              {/* Left Column: Symptom Selectors */}
              <SymptomInput
                symptoms={symptoms}
                onSymptomChange={handleSymptomChange}
                onAnalyze={handleAnalyze}
                onReset={handleReset}
                isAnalyzing={isAnalyzing}
              />

              {/* Right Column: Bayesian Network DAG Visualization */}
              <BayesianNetwork
                symptoms={symptoms}
                inferenceResult={inferenceResult}
              />
            </div>

            {/* Results Grid: Diagnosis Card & Dynamic Chart */}
            <div className="results-grid">
              <DiagnosisResult inferenceResult={inferenceResult} />
              <ProbabilityChart inferenceResult={inferenceResult} />
            </div>

            {/* Sample Benchmark Patient Cases */}
            <SampleCases
              onLoadCase={handleLoadCase}
              currentSymptoms={symptoms}
            />

            {/* Step-by-Step Viva Trace & Mathematical Breakdown */}
            <ProbabilityDetails inferenceResult={inferenceResult} />
          </>
        )}

        {/* Tab 2: CPT & Mathematical Tables */}
        {activeTab === 'cpt' && (
          <div>
            <AboutBayesian currentSymptoms={symptoms} />
          </div>
        )}

        {/* Tab 3: Theory & Viva Q&A */}
        {activeTab === 'about' && (
          <div>
            <AboutBayesian currentSymptoms={symptoms} />
          </div>
        )}
      </main>

      {/* Summary Case Modal for Viva Presentation */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        symptoms={symptoms}
        inferenceResult={inferenceResult}
      />

      {/* Footer */}
      <footer className="app-footer">
        <div>
          <strong>Bayesian Network for Intelligent Medical Diagnosis</strong> • AI College Project Simulator
        </div>
        <div style={{ marginTop: '0.35rem', color: '#64748b' }}>
          Educational demonstration only — not a real medical diagnostic system. Built with React + Vite.
        </div>
      </footer>
    </div>
  );
}
