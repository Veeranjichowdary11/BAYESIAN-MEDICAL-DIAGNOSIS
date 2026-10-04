import React from 'react';
import { Activity, ShieldAlert, Cpu, FileText, Info, BookOpen, Sparkles, RefreshCw } from 'lucide-react';

export function Header({ activeTab, setActiveTab, onReset, onOpenReport }) {
  return (
    <header className="header-container">
      <div className="header-inner">
        <div className="header-brand">
          <div className="logo-badge">
            <Activity size={28} />
          </div>
          <div>
            <h1 className="brand-title">Bayesian Medical Diagnosis</h1>
            <p className="brand-subtitle">Intelligent Medical Diagnosis Using Bayesian Networks</p>
          </div>
        </div>

        <nav className="nav-tabs">
          <button
            id="tab-dashboard"
            className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Cpu size={16} />
            <span>Dashboard & Network</span>
          </button>

          <button
            id="tab-cpt"
            className={`nav-tab-btn ${activeTab === 'cpt' ? 'active' : ''}`}
            onClick={() => setActiveTab('cpt')}
          >
            <BookOpen size={16} />
            <span>CPT & Math Tables</span>
          </button>

          <button
            id="tab-about"
            className={`nav-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <Info size={16} />
            <span>Theory & Viva Q&A</span>
          </button>

          <button
            id="btn-open-report"
            className="nav-tab-btn"
            onClick={onOpenReport}
            title="Generate diagnosis summary report for submission"
          >
            <FileText size={16} />
            <span>Case Report</span>
          </button>
        </nav>
      </div>

      <div className="disclaimer-banner">
        <ShieldAlert size={18} style={{ flexShrink: 0, color: '#f59e0b' }} />
        <span>
          <strong>Academic Demonstration:</strong> Educational demonstration only — not a real medical diagnostic system. Probabilities are computed via Bayesian belief propagation using defined CPT parameters.
        </span>
      </div>
    </header>
  );
}
