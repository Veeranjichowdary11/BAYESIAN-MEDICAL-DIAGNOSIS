import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Table as TableIcon, 
  Share2, 
  BrainCircuit, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { FLU_CPT, INFECTION_CPT, DIAGNOSIS_CPT, VIVA_QUESTIONS } from '../data/cptData';

export function AboutBayesian({ currentSymptoms }) {
  const [openViva, setOpenViva] = useState(0);

  const toggleViva = (index) => {
    setOpenViva(openViva === index ? -1 : index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
      {/* What is a Bayesian Network */}
      <div className="glass-card">
        <div className="card-header-clean">
          <div className="card-title-group">
            <BrainCircuit size={20} color="#38bdf8" />
            <h2>What is a Bayesian Network?</h2>
          </div>
          <span className="badge-tag">AI Concept</span>
        </div>

        <div style={{ padding: '1.5rem' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#e2e8f0', marginBottom: '1.25rem' }}>
            A <strong>Bayesian Network</strong> is a probabilistic graphical model that represents relationships between variables using nodes and directed connections. It uses probability to reason about uncertain situations.
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.75rem' }}>
            How this project works:
          </h3>

          <div className="edu-step-list">
            <div className="edu-step-card">
              <div className="step-num-badge">1</div>
              <div className="step-title">Step 1: User enters symptoms</div>
              <p className="step-desc">The user selects presence of Fever, Cough, and Fatigue as observed evidence.</p>
            </div>

            <div className="edu-step-card">
              <div className="step-num-badge">2</div>
              <div className="step-title">Step 2: Evidence Passed</div>
              <p className="step-desc">Observed evidence is passed to the input layer of the Bayesian Directed Acyclic Graph (DAG).</p>
            </div>

            <div className="edu-step-card">
              <div className="step-num-badge">3</div>
              <div className="step-title">Step 3: CPT Values Used</div>
              <p className="step-desc">Conditional Probability Tables (CPT) quantify conditional relationships between symptoms and diseases.</p>
            </div>

            <div className="edu-step-card">
              <div className="step-num-badge">4</div>
              <div className="step-title">Step 4: Posterior Calculated</div>
              <p className="step-desc">Bayes' rule and marginalization compute the joint and posterior probability distributions.</p>
            </div>

            <div className="edu-step-card">
              <div className="step-num-badge">5</div>
              <div className="step-title">Step 5: Diagnosis Displayed</div>
              <p className="step-desc">The most probable outcome (Flu, Infection, or Healthy) is displayed with confidence metrics.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Probability Tables Explorer */}
      <div className="glass-card">
        <div className="card-header-clean">
          <div className="card-title-group">
            <TableIcon size={20} color="#38bdf8" />
            <h2>Conditional Probability Tables (CPT) Reference</h2>
          </div>
          <span className="badge-tag">Exact Project Specifications</span>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {/* FLU CPT */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f43f5e', marginBottom: '0.5rem' }}>
              1. FLU CPT: P(Flu | Fever, Cough, Fatigue)
            </h3>
            <div className="cpt-table-wrap">
              <table className="cpt-table">
                <thead>
                  <tr>
                    <th>Fever</th>
                    <th>Cough</th>
                    <th>Fatigue</th>
                    <th>Flu Yes</th>
                    <th>Flu No</th>
                  </tr>
                </thead>
                <tbody>
                  {FLU_CPT.map((row, idx) => {
                    const isCurrent =
                      currentSymptoms.fever === row.fever &&
                      currentSymptoms.cough === row.cough &&
                      currentSymptoms.fatigue === row.fatigue;
                    return (
                      <tr key={idx} className={isCurrent ? 'highlight-active-row' : ''}>
                        <td>{row.fever}</td>
                        <td>{row.cough}</td>
                        <td>{row.fatigue}</td>
                        <td style={{ color: '#f87171', fontWeight: 700 }}>{row.fluYes.toFixed(2)}</td>
                        <td>{row.fluNo.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* INFECTION CPT */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#8b5cf6', marginBottom: '0.5rem' }}>
              2. INFECTION CPT: P(Infection | Fever, Cough, Fatigue)
            </h3>
            <div className="cpt-table-wrap">
              <table className="cpt-table">
                <thead>
                  <tr>
                    <th>Fever</th>
                    <th>Cough</th>
                    <th>Fatigue</th>
                    <th>Infection Yes</th>
                    <th>Infection No</th>
                  </tr>
                </thead>
                <tbody>
                  {INFECTION_CPT.map((row, idx) => {
                    const isCurrent =
                      currentSymptoms.fever === row.fever &&
                      currentSymptoms.cough === row.cough &&
                      currentSymptoms.fatigue === row.fatigue;
                    return (
                      <tr key={idx} className={isCurrent ? 'highlight-active-row' : ''}>
                        <td>{row.fever}</td>
                        <td>{row.cough}</td>
                        <td>{row.fatigue}</td>
                        <td style={{ color: '#c084fc', fontWeight: 700 }}>{row.infectionYes.toFixed(2)}</td>
                        <td>{row.infectionNo.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* DIAGNOSIS CPT */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#10b981', marginBottom: '0.5rem' }}>
              3. DIAGNOSIS CPT: P(Diagnosis | Flu, Infection)
            </h3>
            <div className="cpt-table-wrap">
              <table className="cpt-table">
                <thead>
                  <tr>
                    <th>Flu</th>
                    <th>Infection</th>
                    <th>Diagnosis Flu</th>
                    <th>Diagnosis Infection</th>
                    <th>Diagnosis Healthy</th>
                  </tr>
                </thead>
                <tbody>
                  {DIAGNOSIS_CPT.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.flu}</td>
                      <td>{row.infection}</td>
                      <td style={{ color: '#f87171' }}>{row.fluDiagnosis.toFixed(2)}</td>
                      <td style={{ color: '#c084fc' }}>{row.infectionDiagnosis.toFixed(2)}</td>
                      <td style={{ color: '#34d399', fontWeight: 700 }}>{row.healthyDiagnosis.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Viva Questions & Answers */}
      <div className="glass-card">
        <div className="card-header-clean">
          <div className="card-title-group">
            <HelpCircle size={20} color="#38bdf8" />
            <h2>College Viva Questions & Model Answers</h2>
          </div>
          <span className="badge-tag">Exam Preparation</span>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {VIVA_QUESTIONS.map((viva, index) => {
            const isOpen = openViva === index;
            return (
              <div key={index} className="viva-item">
                <button
                  type="button"
                  className="viva-question-btn"
                  onClick={() => toggleViva(index)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: '#38bdf8' }}>Q{index + 1}:</span>
                    <span>{viva.q}</span>
                  </span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {isOpen && (
                  <div className="viva-answer">
                    <strong>Answer:</strong>
                    <div>{viva.a}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
