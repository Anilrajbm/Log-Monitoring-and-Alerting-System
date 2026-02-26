## Log Monitoring & Alerting System

# Introduction

Modern software systems generate large volumes of logs across multiple services.
Engineers rely on log monitoring tools to search logs quickly and get alerted when abnormal behavior such as errors, spikes, or suspicious patterns occur.
This project implements a lightweight log monitoring and alerting system using mock log data.

# Objective

Build a system that:
Ingests application logs from a file
Allows searching and filtering of logs
Detects abnormal patterns using alert rules
Clearly explains why an alert was triggered

# Input Data

Logs are provided in JSON format (logs.json).
Each log entry contains:

{
  "timestamp": "2026-02-19T10:15:30Z",
  "level": "ERROR",
  "service": "payment",
  "message": "DB connection timeout"
}

# Fields
timestamp: ISO format / epoch time
level: INFO / WARN / ERROR
service: auth / payment / order
message: log message text

# Tech Stack

Frontend
React.js
Fetch API for backend communication
UI controls for filtering and CSV export

Backend
Node.js
Express.js
In-memory log storage
REST APIs for alerts and CSV export

# Core Requirements Implementation

1️. Log Ingestion
Logs are read from logs.json
Stored in memory on the backend for processing

2️. Search & Filter
Supported filters:
Log level (INFO / WARN / ERROR)
Service name (auth / payment / order)
Time range (from–to)
Keyword search in message (e.g., timeout, db error)
Filtering is performed on the backend and results are sent to the UI.

3️. Alert Rule Engine
Implemented alert rules:
Rule 1: High Error Rate
Condition: ERROR count > X in last Y minutes
Severity: HIGH
Reason: Excessive ERROR logs in a short time window

Rule 2: Keyword Spike
Condition: Keyword (e.g., timeout) appears more than N times in a time window
Severity: LOW
Reason: Suspicious repeated keyword occurrence
Rules are hard-coded for simplicity.

4️. Alert Output
Alerts are returned via API and displayed in UI.
Each alert shows:
Alert name
Severity (LOW / HIGH)
Reason for firing
Supporting statistics:
Count
Threshold
Time window
Keyword

5. Export Filtered Logs to CSV
UI contains an Export CSV button
Filtered logs are sent to backend
Backend converts JSON → CSV
CSV file is downloaded by the user

CSV Columns:
timestamp, level, service, message

# How to Run the Project

Backend:
npm install
node server.js

Backend runs at: http://localhost:3000

Frontend:
npm install
npm start

Frontend runs at: http://localhost:3000 / http://localhost:5173 (depending on setup)

# Stretch Goals Implemented

Alert severity levels (LOW / HIGH)
Export filtered logs to CSV
Error count over time chart (optional future enhancement)
Periodic polling (can be added using setInterval)

# Conclusion

This project demonstrates a complete log monitoring and alerting workflow, covering ingestion, filtering, alert detection, explanation, and export functionality using modern web technologies.
