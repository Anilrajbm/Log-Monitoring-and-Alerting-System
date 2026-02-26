# Log ingestion

##  Module 1 — Log Ingestion

### Purpose

The Log Ingestion module reads uploaded log files, parses raw log entries, converts them into structured objects, and stores them in memory for further processing.

---

### Implementation Overview

- Built using Node.js + Express.
- File upload handled using **multer** middleware.
- Logs are read line-by-line from uploaded file.
- Each line is parsed into structured JSON-like objects.
- Parsed logs are stored in an in-memory array (`logs`).

---

### API Endpoint

POST /upload

#### Request

- Multipart form-data
- Field name: `file`
- Supported formats: `.txt`, `.log`, `.json`

---

### Processing Flow

1. Upload file via `/upload`.
2. Read file using `fs.readFileSync()`.
3. Split file into lines.
4. Extract:
   - timestamp
   - log level (INFO | WARN | ERROR | DEBUG)
   - message
5. Convert into structured object:

``js
{
  time: "2026-02-19 19:06:36.430",
  level: "ERROR",
  message: "Creating asset with payload..."
}
''

6. Store in Memory
let logs = [];
logs = logsList;
