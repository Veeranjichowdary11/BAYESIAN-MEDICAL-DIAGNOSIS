import React, { useRef, useEffect, useState } from 'react';
import { 
  Thermometer, 
  Wind, 
  ZapOff, 
  Activity, 
  ShieldAlert, 
  Stethoscope, 
  Network, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export function BayesianNetwork({ symptoms, inferenceResult }) {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);

  const feverActive = symptoms.fever === 'Yes';
  const coughActive = symptoms.cough === 'Yes';
  const fatigueActive = symptoms.fatigue === 'Yes';

  const fluYesPct = inferenceResult ? inferenceResult.intermediate.flu.yesPercent : 0;
  const infYesPct = inferenceResult ? inferenceResult.intermediate.infection.yesPercent : 0;
  const topDiagnosis = inferenceResult ? inferenceResult.mostLikely.label : 'Healthy';

  // Calculate dynamic SVG connecting lines between DOM nodes
  const updateLines = () => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();

    const getNodeCenter = (id, side = 'right') => {
      const el = document.getElementById(id);
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      const y = rect.top + rect.height / 2 - container.top;
      let x = rect.left + rect.width / 2 - container.left;
      if (side === 'right') x = rect.right - container.left;
      if (side === 'left') x = rect.left - container.left;
      return { x, y };
    };

    const connections = [
      // Fever to Flu & Infection
      { from: 'node-fever', to: 'node-flu', fromSide: 'right', toSide: 'left', active: feverActive, id: 'conn-fever-flu' },
      { from: 'node-fever', to: 'node-infection', fromSide: 'right', toSide: 'left', active: feverActive, id: 'conn-fever-inf' },
      
      // Cough to Flu & Infection
      { from: 'node-cough', to: 'node-flu', fromSide: 'right', toSide: 'left', active: coughActive, id: 'conn-cough-flu' },
      { from: 'node-cough', to: 'node-infection', fromSide: 'right', toSide: 'left', active: coughActive, id: 'conn-cough-inf' },

      // Fatigue to Flu & Infection
      { from: 'node-fatigue', to: 'node-flu', fromSide: 'right', toSide: 'left', active: fatigueActive, id: 'conn-fatigue-flu' },
      { from: 'node-fatigue', to: 'node-infection', fromSide: 'right', toSide: 'left', active: fatigueActive, id: 'conn-fatigue-inf' },

      // Flu to Diagnosis
      { from: 'node-flu', to: 'node-diagnosis', fromSide: 'right', toSide: 'left', active: fluYesPct >= 50, id: 'conn-flu-diag' },

      // Infection to Diagnosis
      { from: 'node-infection', to: 'node-diagnosis', fromSide: 'right', toSide: 'left', active: infYesPct >= 50, id: 'conn-inf-diag' }
    ];

    const computedLines = connections.map(conn => {
      const start = getNodeCenter(conn.from, conn.fromSide);
      const end = getNodeCenter(conn.to, conn.toSide);
      // Smooth cubic bezier curve control points
      const dx = Math.abs(end.x - start.x) * 0.5;
      const pathData = `M ${start.x} ${start.y} C ${start.x + dx} ${start.y}, ${end.x - dx} ${end.y}, ${end.x} ${end.y}`;
      return {
        id: conn.id,
        path: pathData,
        active: conn.active
      };
    });

    setLines(computedLines);
  };

  useEffect(() => {
    updateLines();
    window.addEventListener('resize', updateLines);
    const timeout = setTimeout(updateLines, 100);
    return () => {
      window.removeEventListener('resize', updateLines);
      clearTimeout(timeout);
    };
  }, [symptoms, inferenceResult]);

  return (
    <div className="glass-card" style={{ height: '100%', position: 'relative' }}>
      <div className="card-header-clean">
        <div className="card-title-group">
          <Network size={20} color="#38bdf8" />
          <h2>Bayesian Network Architecture</h2>
        </div>
        <span className="badge-tag">DAG Directed Graph</span>
      </div>

      <div className="network-canvas-container" ref={containerRef}>
        {/* Dynamic SVG Connecting Lines */}
        <svg className="network-svg-canvas">
          <defs>
            <marker
              id="arrow-default"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="rgba(148, 163, 184, 0.4)" />
            </marker>
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
            </marker>
          </defs>
          {lines.map(line => (
            <path
              key={line.id}
              d={line.path}
              className={`network-arrow-line ${line.active ? 'active' : ''}`}
              markerEnd={line.active ? 'url(#arrow-active)' : 'url(#arrow-default)'}
            />
          ))}
        </svg>

        {/* 3-Column Node Architecture */}
        <div className="network-grid-layer">
          {/* COLUMN 1: INPUT SYMPTOM NODES */}
          <div className="network-column">
            <div className="column-header">Layer 1: Input Evidence</div>

            {/* Fever Node */}
            <div
              id="node-fever"
              className={`node-card ${feverActive ? 'node-active' : ''}`}
            >
              <div className="node-header">
                <div className="node-name">
                  <Thermometer size={16} color="#f87171" />
                  <span>Fever</span>
                </div>
                <span className={`node-state-badge ${feverActive ? 'badge-yes' : 'badge-no'}`}>
                  {symptoms.fever}
                </span>
              </div>
              <div className="node-footer">
                <span>Prior: 30%</span>
                <span>P(e) = {feverActive ? '0.30' : '0.70'}</span>
              </div>
            </div>

            {/* Cough Node */}
            <div
              id="node-cough"
              className={`node-card ${coughActive ? 'node-active' : ''}`}
            >
              <div className="node-header">
                <div className="node-name">
                  <Wind size={16} color="#38bdf8" />
                  <span>Cough</span>
                </div>
                <span className={`node-state-badge ${coughActive ? 'badge-yes' : 'badge-no'}`}>
                  {symptoms.cough}
                </span>
              </div>
              <div className="node-footer">
                <span>Prior: 40%</span>
                <span>P(e) = {coughActive ? '0.40' : '0.60'}</span>
              </div>
            </div>

            {/* Fatigue Node */}
            <div
              id="node-fatigue"
              className={`node-card ${fatigueActive ? 'node-active' : ''}`}
            >
              <div className="node-header">
                <div className="node-name">
                  <ZapOff size={16} color="#fbbf24" />
                  <span>Fatigue</span>
                </div>
                <span className={`node-state-badge ${fatigueActive ? 'badge-yes' : 'badge-no'}`}>
                  {symptoms.fatigue}
                </span>
              </div>
              <div className="node-footer">
                <span>Prior: 35%</span>
                <span>P(e) = {fatigueActive ? '0.35' : '0.65'}</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: INTERMEDIATE CONDITION NODES */}
          <div className="network-column">
            <div className="column-header">Layer 2: Intermediate Inference</div>

            {/* Flu Intermediate Node */}
            <div
              id="node-flu"
              className={`node-card ${fluYesPct >= 50 ? 'node-flu-high' : ''}`}
            >
              <div className="node-header">
                <div className="node-name">
                  <Activity size={16} color="#f43f5e" />
                  <span>Flu</span>
                </div>
                <span className="node-state-badge" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
                  {fluYesPct}% Yes
                </span>
              </div>
              <div className="node-prob-bar">
                <div
                  className="node-prob-fill"
                  style={{
                    width: `${fluYesPct}%`,
                    background: 'linear-gradient(90deg, #f43f5e, #e11d48)'
                  }}
                />
              </div>
              <div className="node-footer">
                <span>P(Flu=Yes|e)</span>
                <span>{(fluYesPct / 100).toFixed(2)}</span>
              </div>
            </div>

            {/* Infection Intermediate Node */}
            <div
              id="node-infection"
              className={`node-card ${infYesPct >= 50 ? 'node-inf-high' : ''}`}
            >
              <div className="node-header">
                <div className="node-name">
                  <ShieldAlert size={16} color="#a855f7" />
                  <span>Infection</span>
                </div>
                <span className="node-state-badge" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
                  {infYesPct}% Yes
                </span>
              </div>
              <div className="node-prob-bar">
                <div
                  className="node-prob-fill"
                  style={{
                    width: `${infYesPct}%`,
                    background: 'linear-gradient(90deg, #a855f7, #7c3aed)'
                  }}
                />
              </div>
              <div className="node-footer">
                <span>P(Inf=Yes|e)</span>
                <span>{(infYesPct / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* COLUMN 3: OUTPUT DIAGNOSIS NODE */}
          <div className="network-column" style={{ justifyContent: 'center' }}>
            <div className="column-header">Layer 3: Output Diagnosis</div>

            <div
              id="node-diagnosis"
              className="node-card node-output-active"
              style={{ padding: '1.25rem 1rem' }}
            >
              <div className="node-header">
                <div className="node-name">
                  <Stethoscope size={18} color="#10b981" />
                  <span style={{ fontSize: '1rem' }}>Final Diagnosis</span>
                </div>
                <span className="node-state-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontWeight: 800 }}>
                  {topDiagnosis.toUpperCase()}
                </span>
              </div>

              <div style={{ margin: '0.8rem 0 0.4rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                Posterior distribution over (Flu, Infection, Healthy).
              </div>

              <div className="node-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem' }}>
                <span>Inference:</span>
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>∑ P(D|Flu,Inf)·P(Flu,Inf|e)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
