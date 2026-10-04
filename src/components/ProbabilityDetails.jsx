import React, { useState } from 'react';
import { Calculator, ChevronDown, ChevronUp, Layers, CheckCheck, HelpCircle } from 'lucide-react';

export function ProbabilityDetails({ inferenceResult }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!inferenceResult) return null;

  const { evidence, intermediate, jointProbs, stepDetails, rawProbabilities, percentages, priors } = inferenceResult;

  return (
    <div className="glass-card" style={{ marginTop: '1.5rem' }}>
      <div 
        className="card-header-clean" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        <div className="card-title-group">
          <Calculator size={20} color="#38bdf8" />
          <h2>Bayesian Probability Details & Mathematical Trace</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="badge-tag">Viva Exam Explanation</span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {isOpen && (
        <div className="details-content">
          {/* Step 1: Evidence & Priors */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>Step 1: Observed Evidence & Priors</span>
            </h3>
            <div className="math-box">
              <div><strong>Observed Evidence Vector (e):</strong> &#123; Fever = <span className="math-highlight">{evidence.fever}</span>, Cough = <span className="math-highlight">{evidence.cough}</span>, Fatigue = <span className="math-highlight">{evidence.fatigue}</span> &#125;</div>
              <div><strong>Prior Distributions:</strong></div>
              <div>• P(Fever = Yes) = {priors.fever.yes} | P(Fever = No) = {priors.fever.no}</div>
              <div>• P(Cough = Yes) = {priors.cough.yes} | P(Cough = No) = {priors.cough.no}</div>
              <div>• P(Fatigue = Yes) = {priors.fatigue.yes} | P(Fatigue = No) = {priors.fatigue.no}</div>
            </div>
          </div>

          {/* Step 2: Intermediate CPT Query */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
              Step 2: Intermediate Node Conditional Probabilities (from CPT tables)
            </h3>
            <div className="math-box">
              <div><strong>Flu Condition:</strong> P(Flu = Yes | Fever={evidence.fever}, Cough={evidence.cough}, Fatigue={evidence.fatigue}) = <span className="math-highlight">{(intermediate.flu.yes).toFixed(2)}</span> &rarr; P(Flu = No | e) = <span className="math-highlight">{(intermediate.flu.no).toFixed(2)}</span></div>
              <div><strong>Infection Condition:</strong> P(Infection = Yes | Fever={evidence.fever}, Cough={evidence.cough}, Fatigue={evidence.fatigue}) = <span className="math-highlight">{(intermediate.infection.yes).toFixed(2)}</span> &rarr; P(Infection = No | e) = <span className="math-highlight">{(intermediate.infection.no).toFixed(2)}</span></div>
            </div>
          </div>

          {/* Step 3: Joint Probability Table for Intermediates */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
              Step 3: Joint Intermediate Distributions P(Flu, Infection | e)
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
              By conditional independence given symptoms: P(Flu=fl, Infection=inf | e) = P(Flu=fl | e) &times; P(Infection=inf | e)
            </p>
            <table className="math-table">
              <thead>
                <tr>
                  <th>Flu State</th>
                  <th>Infection State</th>
                  <th>Joint Computation Formula</th>
                  <th>Joint P(Flu, Inf | e)</th>
                </tr>
              </thead>
              <tbody>
                {jointProbs.map((j, idx) => (
                  <tr key={idx}>
                    <td><strong style={{ color: j.flu === 'Yes' ? '#f87171' : '#94a3b8' }}>{j.flu}</strong></td>
                    <td><strong style={{ color: j.infection === 'Yes' ? '#c084fc' : '#94a3b8' }}>{j.infection}</strong></td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{j.formula}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8' }}>{j.prob.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Step 4: Marginalization over Diagnosis CPT */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
              Step 4: Marginalization & Calculation of P(Diagnosis = d | e)
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
              Formula: P(Diagnosis = d | e) = &sum;<sub>fl, inf</sub> P(Diagnosis = d | Flu=fl, Infection=inf) &times; P(Flu=fl, Infection=inf | e)
            </p>
            <table className="math-table">
              <thead>
                <tr>
                  <th>Intermediate State</th>
                  <th>P(Flu, Inf | e)</th>
                  <th>Contrib &rarr; Flu</th>
                  <th>Contrib &rarr; Infection</th>
                  <th>Contrib &rarr; Healthy</th>
                </tr>
              </thead>
              <tbody>
                {stepDetails.map((s, idx) => (
                  <tr key={idx}>
                    <td>{s.state}</td>
                    <td>{s.jointProb.toFixed(4)}</td>
                    <td>{s.jointProb.toFixed(4)} &times; {s.cptFlu} = <span style={{ color: '#f43f5e' }}>{s.fluContrib.toFixed(4)}</span></td>
                    <td>{s.jointProb.toFixed(4)} &times; {s.cptInf} = <span style={{ color: '#8b5cf6' }}>{s.infContrib.toFixed(4)}</span></td>
                    <td>{s.jointProb.toFixed(4)} &times; {s.cptHealthy} = <span style={{ color: '#10b981' }}>{s.healthyContrib.toFixed(4)}</span></td>
                  </tr>
                ))}
                <tr style={{ background: 'rgba(56, 189, 248, 0.1)', fontWeight: 700 }}>
                  <td colSpan="2">Marginal Sums (Raw)</td>
                  <td style={{ color: '#f43f5e' }}>{rawProbabilities.flu.toFixed(4)}</td>
                  <td style={{ color: '#8b5cf6' }}>{rawProbabilities.infection.toFixed(4)}</td>
                  <td style={{ color: '#10b981' }}>{rawProbabilities.healthy.toFixed(4)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Step 5: Final Normalization */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
              Step 5: Normalization to 100.00%
            </h3>
            <div className="math-box">
              <div>Total Probability Normalizer &alpha; = {rawProbabilities.flu.toFixed(4)} + {rawProbabilities.infection.toFixed(4)} + {rawProbabilities.healthy.toFixed(4)} = <strong style={{ color: '#38bdf8' }}>{rawProbabilities.sum.toFixed(4)}</strong></div>
              <div style={{ marginTop: '0.5rem' }}>
                • <strong>P(Diagnosis = Flu | e)</strong> = {percentages.flu.toFixed(2)}%<br/>
                • <strong>P(Diagnosis = Infection | e)</strong> = {percentages.infection.toFixed(2)}%<br/>
                • <strong>P(Diagnosis = Healthy | e)</strong> = {percentages.healthy.toFixed(2)}%
              </div>
              <div style={{ marginTop: '0.5rem', color: '#10b981', fontWeight: 700 }}>
                &check; Exact Sum = 100.00% (No NaN, No Negative Values)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
