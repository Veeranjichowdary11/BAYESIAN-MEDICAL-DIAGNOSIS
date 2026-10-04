import React from 'react';
import { Award, AlertTriangle, CheckCircle, Flame, Shield, HeartPulse } from 'lucide-react';

export function DiagnosisResult({ inferenceResult }) {
  if (!inferenceResult) return null;

  const { mostLikely, allOutcomes, percentages } = inferenceResult;

  const getIcon = (key) => {
    switch (key) {
      case 'flu':
        return <Flame size={18} color="#f43f5e" />;
      case 'infection':
        return <AlertTriangle size={18} color="#8b5cf6" />;
      case 'healthy':
        return <CheckCircle size={18} color="#10b981" />;
      default:
        return <HeartPulse size={18} color="#38bdf8" />;
    }
  };

  return (
    <div className="glass-card" style={{ height: '100%' }}>
      <div className="card-header-clean">
        <div className="card-title-group">
          <Award size={20} color="#38bdf8" />
          <h2>Diagnosis Results</h2>
        </div>
        <span className="badge-tag">Posterior Probability</span>
      </div>

      <div className="result-card-inner">
        {/* Most Likely Diagnosis Hero Card */}
        <div className="most-likely-hero">
          <div
            className="hero-glow-blob"
            style={{
              background: mostLikely.color
            }}
          />
          <div className="most-likely-label">Most Likely Diagnosis</div>
          <div className="most-likely-name" style={{ color: mostLikely.color }}>
            {mostLikely.label.toUpperCase()}
          </div>
          <div className="most-likely-confidence" style={{ border: `1px solid ${mostLikely.color}` }}>
            <span>Confidence:</span>
            <span style={{ color: mostLikely.color }}>{mostLikely.percent}%</span>
          </div>
        </div>

        {/* Breakdown Horizontal Progress Bars */}
        <div className="progress-list">
          {allOutcomes.map(item => {
            const isWinner = item.key === mostLikely.key;
            return (
              <div
                key={item.key}
                id={`result-bar-${item.key}`}
                className={`progress-item ${isWinner ? 'is-winner' : ''}`}
              >
                <div className="progress-header">
                  <div className="progress-title">
                    {getIcon(item.key)}
                    <span>{item.label}</span>
                    {isWinner && (
                      <span
                        style={{
                          fontSize: '0.68rem',
                          background: item.color,
                          color: '#fff',
                          padding: '0.1rem 0.45rem',
                          borderRadius: '9999px',
                          fontWeight: 700,
                          marginLeft: '0.4rem'
                        }}
                      >
                        HIGHEST
                      </span>
                    )}
                  </div>
                  <div className="progress-pct" style={{ color: item.color }}>
                    {item.percent.toFixed(1)}%
                  </div>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${Math.max(item.percent, 3)}%`,
                      backgroundColor: item.color,
                      boxShadow: isWinner ? `0 0 12px ${item.color}` : 'none'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.78rem', color: '#94a3b8' }}>
          ∑ Probabilities: (Flu: {percentages.flu}% + Infection: {percentages.infection}% + Healthy: {percentages.healthy}%) = <strong style={{ color: '#38bdf8' }}>100.00%</strong>
        </div>
      </div>
    </div>
  );
}
