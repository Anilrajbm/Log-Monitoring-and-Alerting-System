# Search and Filter and Ruled Base Module

##  Module 2 — Search & Filtering

### Purpose

The Search & Filtering module allows users to query logs dynamically based on multiple parameters such as log level, service name, keyword, and time range.

This module is implemented inside `server.js` using query parameters and array filtering logic.

---

### API Endpoint

GET /logs

---

### Supported Query Parameters

| Parameter | Description |
|-----------|------------|
| level     | Filter by log level (INFO, WARN, ERROR) |
| service   | Filter by service name |
| keyword   | Search keyword inside message |
| from      | Start timestamp (ISO format) |
| to        | End timestamp (ISO format) |

---

### Example Request

GET /logs?level=ERROR&keyword=timeout

---

### Implementation Logic

Logs are stored in memory:


---

## Module 3 — Rule-Based Alert Engine

### Purpose

The Alert Engine evaluates stored logs and detects abnormal patterns based on predefined rules.

The logic is implemented inside `alertEngine.js`.

---

### Alert Evaluation Flow

GET /alerts  
→ Calls `checkAlerts(logs)`  
→ Returns triggered alerts  

---

### Implemented Rules

### 1️⃣ High Error Rate

Condition:
- More than 5 ERROR logs within the last 5 minutes.

Implementation:

```js
const recentErrors = logs.filter(log => {
  const logTime = new Date(log.time.replace(" ", "T"));
  return log.level === "ERROR" && logTime >= fiveMinutesAgo;
});


