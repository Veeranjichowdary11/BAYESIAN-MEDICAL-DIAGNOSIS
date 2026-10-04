import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export function ProbabilityChart({ inferenceResult }) {
  if (!inferenceResult) return null;

  const { allOutcomes } = inferenceResult;

  // Render bars in standard order: Flu, Infection, Healthy
  const chartItems = [
    allOutcomes.find(o => o.key === 'flu'),
    allOutcomes.find(o => o.key === 'infection'),
    allOutcomes.find(o => o.key === 'healthy')
  ].filter(Boolean);

  const gridLevels = [100, 75, 50, 25, 0];

  return (
    <div className="glass-card" style={{ height: '100%' }}>
      <div className="card-header-clean">
        <div className="card-title-group">
          <BarChart3 size={20} color="#38bdf8" />
          <h2>Probability Distribution Chart</h2>
        </div>
        <span className="badge-tag">Dynamic Chart</span>
      </div>

      <div className="chart-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
          <span>Posterior Probability P(Diagnosis | Evidence)</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>Y-Axis: 0% to 100%</span>
        </div>

        {/* Visual Bar Chart with Gridlines */}
        <div className="bar-chart-visual">
          {gridLevels.map(level => (
            <div
              key={level}
              className="chart-grid-line"
              style={{ bottom: `${(level / 100) * 85 + 8}%` }}
            >
              <span>{level}%</span>
            </div>
          ))}

          {chartItems.map(item => (
            <div key={item.key} className="chart-bar-column">
              <div
                className="chart-bar-rect"
                style={{
                  height: `${Math.max(item.percent * 0.85, 4)}%`,
                  backgroundColor: item.color,
                  boxShadow: `0 4px 14px ${item.color}66`
                }}
              >
                <div className="chart-bar-val" style={{ color: item.color }}>
                  {item.percent}%
                </div>
              </div>
              <div className="chart-bar-label">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom Legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.25rem', fontSize: '0.82rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f43f5e' }}></span>
            <span>Flu ({inferenceResult.percentages.flu}%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#8b5cf6' }}></span>
            <span>Infection ({inferenceResult.percentages.infection}%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }}></span>
            <span>Healthy ({inferenceResult.percentages.healthy}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
