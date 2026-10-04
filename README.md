# Bayesian Network for Intelligent Medical Diagnosis

> **Disclaimer:** Educational demonstration only — not a real medical diagnostic system. This application is designed for college AI coursework and academic demonstration of probabilistic reasoning and Bayesian belief propagation.

---

## 📌 Project Overview & Objective

The **Bayesian Network for Intelligent Medical Diagnosis** is an interactive, no-code/low-code graphical AI simulator. It models clinical diagnostic reasoning under uncertainty using a **3-Layer Bayesian Directed Acyclic Graph (DAG)** with Conditional Probability Tables (CPTs).

Given observed patient symptoms (**Fever**, **Cough**, **Fatigue**), the system dynamically calculates intermediate disease likelihoods (**Flu**, **Infection**) and computes the final posterior probability distribution across:
1. **Flu**
2. **Infection**
3. **Healthy**

All probabilities are calculated strictly in real-time in JavaScript without hardcoding, and guaranteed to sum to exactly **100.00%**.

---

## 🛠️ Technology Stack

- **Frontend Core:** React 18 (Hooks, dynamic SVG, state propagation)
- **Build Tool:** Vite 5 (Fast ESM development & production bundling)
- **Styling:** Vanilla CSS with custom glassmorphism, responsive grid system, and micro-animations
- **Icons & Effects:** Lucide React & Canvas Confetti
- **Architecture:** 100% Client-side execution (No backend, no database, no API keys needed)

---

## 🧠 Bayesian Network Architecture

### 1. Structure
```
Layer 1: Input Evidence Nodes
   [Fever: Yes/No]        [Cough: Yes/No]        [Fatigue: Yes/No]
         │       \        /      │      \        /       │
         │        \      /       │       \      /        │
         ▼         ▼    ▼        ▼        ▼    ▼         ▼
Layer 2: Intermediate Inference Nodes
              [Flu: Yes/No]            [Infection: Yes/No]
                     \                      /
                      \                    /
                       ▼                  ▼
Layer 3: Output Classification Node
                  [Diagnosis: Flu / Infection / Healthy]
```

### 2. Network Directed Connections
- **Fever → Flu**, **Cough → Flu**, **Fatigue → Flu**
- **Fever → Infection**, **Cough → Infection**, **Fatigue → Infection**
- **Flu → Diagnosis**, **Infection → Diagnosis**

---

## 📊 Conditional Probability Tables (CPT)

### 1. Prior Probabilities
| Variable | Yes ($P$) | No ($1 - P$) |
| :--- | :---: | :---: |
| **Fever** | 0.30 | 0.70 |
| **Cough** | 0.40 | 0.60 |
| **Fatigue** | 0.35 | 0.65 |

### 2. Flu CPT: $P(\text{Flu} \mid \text{Fever}, \text{Cough}, \text{Fatigue})$
| Fever | Cough | Fatigue | Flu = Yes | Flu = No |
| :---: | :---: | :---: | :---: | :---: |
| Yes | Yes | Yes | **0.90** | 0.10 |
| Yes | Yes | No | **0.80** | 0.20 |
| Yes | No | Yes | **0.75** | 0.25 |
| Yes | No | No | **0.55** | 0.45 |
| No | Yes | Yes | **0.60** | 0.40 |
| No | Yes | No | **0.35** | 0.65 |
| No | No | Yes | **0.25** | 0.75 |
| No | No | No | **0.05** | 0.95 |

### 3. Infection CPT: $P(\text{Infection} \mid \text{Fever}, \text{Cough}, \text{Fatigue})$
| Fever | Cough | Fatigue | Infection = Yes | Infection = No |
| :---: | :---: | :---: | :---: | :---: |
| Yes | Yes | Yes | **0.80** | 0.20 |
| Yes | Yes | No | **0.75** | 0.25 |
| Yes | No | Yes | **0.70** | 0.30 |
| Yes | No | No | **0.50** | 0.50 |
| No | Yes | Yes | **0.55** | 0.45 |
| No | Yes | No | **0.30** | 0.70 |
| No | No | Yes | **0.20** | 0.80 |
| No | No | No | **0.05** | 0.95 |

### 4. Diagnosis CPT: $P(\text{Diagnosis} \mid \text{Flu}, \text{Infection})$
| Flu | Infection | Diagnosis: Flu | Diagnosis: Infection | Diagnosis: Healthy |
| :---: | :---: | :---: | :---: | :---: |
| Yes | Yes | **0.60** | **0.35** | **0.05** |
| Yes | No | **0.90** | **0.05** | **0.05** |
| No | Yes | **0.05** | **0.90** | **0.05** |
| No | No | **0.02** | **0.03** | **0.95** |

---

## 🧮 How the Bayesian Calculation Works

### Step-by-Step Mathematical Derivation:
1. **Evidence Collection:** The observed symptom state $e = (Fever = f, Cough = c, Fatigue = fa)$.
2. **CPT Lookup:** Look up $P(Flu = Yes \mid e)$ and $P(Infection = Yes \mid e)$ directly from their CPT tables.
3. **Conditional Independence:** Because $Flu$ and $Infection$ are conditionally independent given observed symptoms:
   $$P(Flu = fl, Infection = inf \mid e) = P(Flu = fl \mid e) \times P(Infection = inf \mid e)$$
4. **Marginalization over Intermediate States:**
   $$P(\text{Diagnosis} = d \mid e) = \sum_{fl \in \{Y, N\}} \sum_{inf \in \{Y, N\}} P(\text{Diagnosis} = d \mid Flu=fl, Infection=inf) \cdot P(Flu=fl, Infection=inf \mid e)$$
5. **Normalization:**
   Ensure $\sum_{d} P(\text{Diagnosis} = d \mid e) = 1.0000$ ($100.00\%$).

---

## 🧪 Benchmark Test Cases & Expected Outputs

### Test Case 1: Severe Multi-Symptom Patient
- **Inputs:** Fever = `Yes`, Cough = `Yes`, Fatigue = `Yes`
- **Intermediate Beliefs:** $P(Flu=Yes|e) = 0.90$, $P(Infection=Yes|e) = 0.80$
- **Expected Posterior Probabilities:**
  - **Flu:** **59.84%** (Most Likely)
  - **Infection:** **33.36%**
  - **Healthy:** **6.80%**

### Test Case 2: Isolated Cough Patient
- **Inputs:** Fever = `No`, Cough = `Yes`, Fatigue = `No`
- **Intermediate Beliefs:** $P(Flu=Yes|e) = 0.35$, $P(Infection=Yes|e) = 0.30$
- **Expected Posterior Probabilities:**
  - **Flu:** **30.24%**
  - **Infection:** **23.82%**
  - **Healthy:** **45.95%** (Most Likely)

### Test Case 3: Fever & Fatigue Patient
- **Inputs:** Fever = `Yes`, Cough = `No`, Fatigue = `Yes`
- **Intermediate Beliefs:** $P(Flu=Yes|e) = 0.75$, $P(Infection=Yes|e) = 0.70$
- **Expected Posterior Probabilities:**
  - **Flu:** **52.78%** (Most Likely)
  - **Infection:** **35.48%**
  - **Healthy:** **11.75%**

### Test Case 4: Asymptomatic Baseline
- **Inputs:** Fever = `No`, Cough = `No`, Fatigue = `No`
- **Expected Posterior Probabilities:**
  - **Flu:** **3.89%**
  - **Infection:** **4.88%**
  - **Healthy:** **91.23%** (Most Likely)

---

## 🚀 How to Run the Application Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### Step 1: Install Dependencies
Open your terminal in the project root directory and run:
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
The application will automatically launch in your browser at:
`http://localhost:3000`

### Step 3: Build for Production (Optional)
```bash
npm run build
```

---

## 🎓 Viva Questions and Model Answers

**Q1: What is a Bayesian Network?**
> **Answer:** A Bayesian Network is a Directed Acyclic Graph (DAG) that represents random variables as nodes and their conditional dependencies as directed edges. It provides a compact representation of the joint probability distribution using the chain rule and conditional independence.

**Q2: What is a Conditional Probability Table (CPT)?**
> **Answer:** A CPT contains conditional probabilities for a node given every possible combination of values of its parent nodes. If a binary node has $k$ binary parents, its CPT contains $2^k$ probability distributions.

**Q3: What is the concept of d-separation in this network?**
> **Answer:** Given the evidence of symptoms (Fever, Cough, Fatigue), the intermediate nodes Flu and Infection are conditionally independent because their common causes are fully observed, blocking the path between them.

**Q4: How does inference in this network avoid exponential complexity?**
> **Answer:** By exploiting conditional independence properties of the DAG, we compute marginal probabilities via factorized local CPT lookups and small joint summations rather than enumerating an intractable full joint distribution.

---

## 📁 Clean Project Structure
```
├── package.json
├── vite.config.js
├── index.html
├── README.md
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SymptomInput.jsx
│   │   ├── BayesianNetwork.jsx
│   │   ├── DiagnosisResult.jsx
│   │   ├── ProbabilityChart.jsx
│   │   ├── SampleCases.jsx
│   │   ├── ProbabilityDetails.jsx
│   │   ├── AboutBayesian.jsx
│   │   └── ReportModal.jsx
│   ├── data/
│   │   └── cptData.js
│   └── utils/
│       └── bayesianInference.js
```
