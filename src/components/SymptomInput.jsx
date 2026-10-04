import React from 'react';
import { Thermometer, Wind, ZapOff, Play, RotateCcw, Check, UserCheck } from 'lucide-react';
import { PRIORS } from '../data/cptData';

export function SymptomInput({ symptoms, onSymptomChange, onAnalyze, onReset, isAnalyzing }) {
  return (
    <div className="glass-card" style={{ height: '100%' }}>
      <div className="card-header-clean">
        <div className="card-title-group">
          <UserCheck size={20} color="#38bdf8" />
          <h2>Patient Symptoms</h2>
        </div>
        <span className="badge-tag">Evidence Input</span>
      </div>

      <div className="symptom-section">
        {/* Fever Selector */}
        <div className="symptom-item" id="symptom-fever-group">
          <div className="symptom-meta">
            <div className="symptom-label-wrap">
              <div className="symptom-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
                <Thermometer size={18} />
              </div>
              <div>
                <div className="symptom-name">Fever</div>
                <div className="prior-pill">P(Prior=Yes) = {(PRIORS.fever.yes * 100).toFixed(0)}%</div>
              </div>
            </div>
          </div>

          <div className="toggle-group">
            <button
              id="fever-yes-btn"
              type="button"
              className={`toggle-btn ${symptoms.fever === 'Yes' ? 'active-yes' : ''}`}
              onClick={() => onSymptomChange('fever', 'Yes')}
            >
              {symptoms.fever === 'Yes' && <Check size={14} />}
              <span>Yes</span>
            </button>
            <button
              id="fever-no-btn"
              type="button"
              className={`toggle-btn ${symptoms.fever === 'No' ? 'active-no' : ''}`}
              onClick={() => onSymptomChange('fever', 'No')}
            >
              {symptoms.fever === 'No' && <Check size={14} />}
              <span>No</span>
            </button>
          </div>
        </div>

        {/* Cough Selector */}
        <div className="symptom-item" id="symptom-cough-group">
          <div className="symptom-meta">
            <div className="symptom-label-wrap">
              <div className="symptom-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                <Wind size={18} />
              </div>
              <div>
                <div className="symptom-name">Cough</div>
                <div className="prior-pill">P(Prior=Yes) = {(PRIORS.cough.yes * 100).toFixed(0)}%</div>
              </div>
            </div>
          </div>

          <div className="toggle-group">
            <button
              id="cough-yes-btn"
              type="button"
              className={`toggle-btn ${symptoms.cough === 'Yes' ? 'active-yes' : ''}`}
              onClick={() => onSymptomChange('cough', 'Yes')}
            >
              {symptoms.cough === 'Yes' && <Check size={14} />}
              <span>Yes</span>
            </button>
            <button
              id="cough-no-btn"
              type="button"
              className={`toggle-btn ${symptoms.cough === 'No' ? 'active-no' : ''}`}
              onClick={() => onSymptomChange('cough', 'No')}
            >
              {symptoms.cough === 'No' && <Check size={14} />}
              <span>No</span>
            </button>
          </div>
        </div>

        {/* Fatigue Selector */}
        <div className="symptom-item" id="symptom-fatigue-group">
          <div className="symptom-meta">
            <div className="symptom-label-wrap">
              <div className="symptom-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                <ZapOff size={18} />
              </div>
              <div>
                <div className="symptom-name">Fatigue</div>
                <div className="prior-pill">P(Prior=Yes) = {(PRIORS.fatigue.yes * 100).toFixed(0)}%</div>
              </div>
            </div>
          </div>

          <div className="toggle-group">
            <button
              id="fatigue-yes-btn"
              type="button"
              className={`toggle-btn ${symptoms.fatigue === 'Yes' ? 'active-yes' : ''}`}
              onClick={() => onSymptomChange('fatigue', 'Yes')}
            >
              {symptoms.fatigue === 'Yes' && <Check size={14} />}
              <span>Yes</span>
            </button>
            <button
              id="fatigue-no-btn"
              type="button"
              className={`toggle-btn ${symptoms.fatigue === 'No' ? 'active-no' : ''}`}
              onClick={() => onSymptomChange('fatigue', 'No')}
            >
              {symptoms.fatigue === 'No' && <Check size={14} />}
              <span>No</span>
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="action-buttons-group">
          <button
            id="btn-analyze-patient"
            type="button"
            className="btn-primary-analyze"
            onClick={onAnalyze}
            disabled={isAnalyzing}
          >
            <Play size={18} fill="currentColor" />
            <span>{isAnalyzing ? 'Computing Inference...' : 'Analyze Patient'}</span>
          </button>

          <button
            id="btn-reset-symptoms"
            type="button"
            className="btn-secondary-reset"
            onClick={onReset}
          >
            <RotateCcw size={16} />
            <span>Reset Symptoms</span>
          </button>
        </div>
      </div>
    </div>
  );
}
