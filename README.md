# Log Monitoring & Alerting System

## Introduction

Modern software systems generate large volumes of logs across multiple services.
Engineers rely on log monitoring tools to search logs efficiently and get alerted when abnormal behavior such as errors, spikes, or suspicious patterns occur.

This project implements a lightweight log monitoring and alerting system using mock log data with a modular backend and a React-based dashboard.

## Objective

Build a system that:
Ingests application logs from a file
Allows searching and filtering of logs
Detects abnormal patterns using alert rules
Clearly explains why an alert was triggered

## Input Data

Logs are uploaded as text or log files and internally converted into structured JSON objects.

Example Parsed Log

{
  "time": "2026-02-19 10:15:30",
  "level": "ERROR",
  "message": "DB connection timeout"
}

### Fields

timestamp: ISO format / epoch time
level: INFO / WARN / ERROR
service: auth / payment / order
message: log message text

## Tech Stack

Frontend:

React.js (Vite)
Fetch API for backend communication
Dashboard for logs and alerts

Backend:

Node.js
Express.js
Multer (file upload)
In-memory log storage
REST APIs for logs and alerts

## Core Requirements Implementation

1. Log Ingestion

Logs are uploaded via REST API
Raw log files are read and parsed line-by-line
Logs are converted into structured objects
Parsed logs are stored in memory and forwarded for further processing

2. Search & Filter

Supported filters (via query parameters):
Log level (INFO / WARN / ERROR)
Keyword search in message (e.g., timeout)
Time range (from – to)
Filtering is performed on the backend and results are returned to the frontend.

3. Alert Rule Engine

A rule-based alert engine evaluates stored logs.

Implemented rules:

High Error Rate
Condition: More than 5 ERROR logs in the last 5 minutes
Severity: HIGH
Keyword Spike
Condition: Keyword timeout appears more than 3 times
Severity: LOW
Each alert includes a clear reason and supporting statistics.

4. Alert Output

Alerts are exposed via API
Displayed in a React-based dashboard

Each alert shows:
Alert name
Severity
Reason for firing
Supporting stats (count, time window, keyword)

## How to Run the Project

### Backend:

npm install

node server.js

Backend runs at: http://localhost:5000 / http://localhost:6000

### Frontend:

npm install

npm run dev

Frontend runs at: http://localhost:5173

## Conclusion

This project demonstrates a complete log monitoring and alerting workflow, including log ingestion, searching and filtering, rule-based alert detection, and alert visualization using modern web technologies.
