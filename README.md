#  LogPulse – Smart Log Monitoring Dashboard

LogPulse is a lightweight log monitoring and alerting system built using Streamlit and Machine Learning.  
It automatically classifies logs, detects error spikes, and visualizes system health in near real-time.

---

##  Features

- Intelligent log classification using TF-IDF + Logistic Regression
- Automatic alert generation based on error thresholds
- Error trend visualization (per-minute aggregation)
- Time-based log filtering (Last X minutes)
- Category-wise error distribution (Pie Chart)
- Styled and filterable log table
- Export filtered logs as CSV
- Auto-refresh every 10 seconds

---

##  Tech Stack

- Python 3.8+
- Streamlit
- Pandas
- Scikit-learn
- Matplotlib
- JSON (for log storage)

---

##  Project Structure

logpulse/
│
├── app.py
├── ml_engine.py
├── data_loader.py
├── alert_engine.py
├── ui_components.py
├── logs.json
└── README.md

---

##  Installation & Setup

### 1️ Install Dependencies

pip install streamlit pandas scikit-learn matplotlib streamlit-autorefresh

### 2️ Run the Application

streamlit run app.py

The dashboard will open automatically in your browser.

---

##  How It Works

1. Logs are loaded from a JSON file.
2. Machine Learning classifies each log message into predefined categories.
3. Alerts are generated when error counts exceed defined thresholds.
4. The dashboard displays:
   - Error trends over time
   - Category-wise error distribution
   - Time-window filtered logs
   - Styled log table

---

##  Use Cases

- Monitoring backend services
- Detecting abnormal error spikes
- Identifying recurring failure patterns
- Faster root cause analysis
- Lightweight alternative to heavy monitoring tools

---

