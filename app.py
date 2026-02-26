# app.py

import streamlit as st
from streamlit_autorefresh import st_autorefresh
from datetime import datetime

from ml_engine import LogClassifier, apply_time_filter, plot_error_distribution
from data_loader import load_logs
from alert_engine import get_alerts
from ui_components import sidebar_controls, color_rows

# Page Config
st.set_page_config(page_title="Log Pulse", layout="wide")
st_autorefresh(interval=10000, key="refresh")

st.title("Log Monitoring & Alerting")
st.caption(f"Last sync: {datetime.now().strftime('%H:%M:%S')} | Smart Search Enabled")

# Initialize ML Tool
clf_tool = LogClassifier()

# Load Data
df = load_logs("logs.json", clf_tool)

# Sidebar
levels, services, search_input, time_window = sidebar_controls(df)

# Filtering
filtered_df = df[
    (df['level'].isin(levels)) &
    (df['service'].isin(services))
]

if search_input:
    filtered_df = filtered_df[
        filtered_df['message'].str.contains(search_input, case=False)
    ]

# Apply Time Filter (YOUR MODULE)
time_filtered_df = apply_time_filter(filtered_df, time_window)

# Alerts
st.subheader("Active Alerts")
for a in get_alerts(df):
    with st.expander(f"{a['name']} - {a['severity']}", expanded=True):
        st.write(a['reason'])

# Error Trend
st.subheader("Error count over time")
err_trend = df[df['level'] == 'ERROR'].resample('1min', on='time').count()['level']
st.line_chart(err_trend)

# Pie Chart (YOUR MODULE)
plot_error_distribution(time_filtered_df, time_window, st)

# Log Table
st.subheader("Filtered Logs (Time Window Applied)")
st.dataframe(
    time_filtered_df.sort_values(by='time', ascending=False)
    .style.apply(color_rows, axis=1),
    use_container_width=True
)