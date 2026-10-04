import React from 'react';
import { X, Printer, FileText, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

export function ReportModal({ isOpen, onClose, symptoms, inferenceResult }) {
  if (!isOpen || !inferenceResult) return null;

  const { evidence, percentages, mostLikely, intermediate, computedAt } = inferenceResult;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText size={20} color="#38bdf8" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Bayesian Diagnostic Summary Report</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '0.3rem',
              borderRadius: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Header Info */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Academic Project Report</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>
              Bayesian Network for Intelligent Medical Diagnosis
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.25rem' }}>
              Generated: {new Date().toLocaleDateString()} at {computedAt} | Engine: Exact CPT Inference
            </div>
          </div>

          {/* Patient Symptoms Summary */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
              1. Observed Patient Evidence
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', background: 'rgba(15,23,42,0.8)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Fever:</span>
                <div style={{ fontWeight: 700, color: evidence.fever === 'Yes' ? '#f87171' : '#e2e8f0' }}>{evidence.fever}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Cough:</span>
                <div style={{ fontWeight: 700, color: evidence.cough === 'Yes' ? '#38bdf8' : '#e2e8f0' }}>{evidence.cough}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Fatigue:</span>
                <div style={{ fontWeight: 700, color: evidence.fatigue === 'Yes' ? '#fbbf24' : '#e2e8f0' }}>{evidence.fatigue}</div>
              </div>
            </div>
          </div>

          {/* Intermediate Beliefs */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
              2. Intermediate Belief Propagation
            </h3>
            <div style={{ background: 'rgba(15,23,42,0.8)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.85rem' }}>
              <div>• P(Flu = Yes | Evidence) = <strong>{intermediate.flu.yesPercent}%</strong></div>
              <div>• P(Infection = Yes | Evidence) = <strong>{intermediate.infection.yesPercent}%</strong></div>
            </div>
          </div>

          {/* Diagnostic Probability Distribution */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
              3. Final Posterior Probability Distribution
            </h3>
            <div style={{ background: 'rgba(15,23,42,0.8)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span>Flu Diagnosis:</span>
                <strong style={{ color: '#f43f5e' }}>{percentages.flu.toFixed(2)}%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span>Infection Diagnosis:</span>
                <strong style={{ color: '#8b5cf6' }}>{percentages.infection.toFixed(2)}%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Healthy Assessment:</span>
                <strong style={{ color: '#10b981' }}>{percentages.healthy.toFixed(2)}%</strong>
              </div>
            </div>
          </div>

          {/* Final Conclusion Box */}
          <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Most Probable Diagnostic Classification</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', margin: '0.25rem 0' }}>
              {mostLikely.label.toUpperCase()} ({mostLikely.percent}%)
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
            Educational demonstration only — not a real medical diagnostic system.
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={handlePrint}
            style={{
              background: '#0284c7',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Printer size={16} />
            <span>Print Report</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
