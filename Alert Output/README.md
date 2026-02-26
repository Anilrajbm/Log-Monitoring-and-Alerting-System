# Alert Output

#  Log Monitoring & Alert Dashboard

A lightweight Log Monitoring & Alerting System built using:

-  Backend: Node.js + Express
-  Frontend: React (Vite)
-  In-memory data storage
-  Rule-based Alert Engine

---

## Project Overview

This system allows users to:

- Upload application logs
- Search and filter logs dynamically
- Detect abnormal patterns using rule-based alerts
- Display active alerts in a clean dashboard

The system is designed with modular architecture:

Module 1 → Log Ingestion  
Module 2 → Search & Filtering  
Module 3 → Rule-Based Alert Engine  
Module 4 → API & Frontend Integration  

---

# 🏗️ Architecture

Frontend (React)
        ↓
REST APIs (Express)
        ↓
In-memory Log Store
        ↓
Alert Engine

---

#  Module 1 — Log Ingestion

### Purpose

Reads uploaded logs and stores them in memory for processing.

### API Endpoint

POST `/receive-logs`

### Flow

1. Frontend uploads parsed logs.
2. Backend stores logs in memory:

