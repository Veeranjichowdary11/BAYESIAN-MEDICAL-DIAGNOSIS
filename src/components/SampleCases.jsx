import React from 'react';
import { Users, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { SAMPLE_PATIENTS } from '../data/cptData';

export function SampleCases({ onLoadCase, currentSymptoms }) {
  const isSelected = (p) => {
    return (
      currentSymptoms.fever === p.fever &&
      currentSymptoms.cough === p.cough &&
      currentSymptoms.fatigue === p.fatigue
    );
  };

  return (
    <div className="glass-card" style={{ marginTop: '1.5rem' }}>
      <div className="card-header-clean">
        <div className="card-title-group">
          <Users size={20} color="#38bdf8" />
          <h2>Benchmark Patient Test Cases</h2>
        </div>
        <span className="badge-tag">Pre-configured Benchmarks</span>
      </div>

      <div className="sample-cases-grid">
        {SAMPLE_PATIENTS.map(patient => {
          const active = isSelected(patient);
          return (
            <div
              key={patient.id}
              id={`sample-case-btn-${patient.id}`}
              className={`sample-case-card ${active ? 'sample-case-active' : ''}`}
              onClick={() => onLoadCase(patient)}
              style={active ? { borderColor: '#38bdf8', background: 'rgba(56, 189, 248, 0.08)' } : {}}
            >
              <div>
                <div className="case-top">
                  <div className="case-title">{patient.name}</div>
                  <span className="case-tag">{patient.tag}</span>
                </div>

                <div className="case-symptoms-pills">
                  <span
                    className="case-symptom-pill"
                    style={{
                      background: patient.fever === 'Yes' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      color: patient.fever === 'Yes' ? '#f87171' : '#94a3b8'
                    }}
                  >
                    Fever: {patient.fever}
                  </span>

                  <span
                    className="case-symptom-pill"
                    style={{
                      background: patient.cough === 'Yes' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      color: patient.cough === 'Yes' ? '#38bdf8' : '#94a3b8'
                    }}
                  >
                    Cough: {patient.cough}
                  </span>

                  <span
                    className="case-symptom-pill"
                    style={{
                      background: patient.fatigue === 'Yes' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      color: patient.fatigue === 'Yes' ? '#fbbf24' : '#94a3b8'
                    }}
                  >
                    Fatigue: {patient.fatigue}
                  </span>
                </div>

                <p className="case-desc">{patient.description}</p>
              </div>

              <button type="button" className="btn-load-case">
                <span>{active ? 'Currently Active' : 'Load This Case'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
