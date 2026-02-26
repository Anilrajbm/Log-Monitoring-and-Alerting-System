const express = require("express");
const cors = require("cors");
const { checkAlerts } = require("./alertEngine");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const PORT = 6000;

let logs = [];


app.post("/receive-logs", (req, res) => {
  logs = req.body;
  console.log("Logs received:", logs.length);
  res.json({ message: "Logs stored successfully" });
});


app.get("/logs", (req, res) => {
  let filtered = logs;

  const { level, service, keyword, from, to } = req.query;

  if (level) {
    filtered = filtered.filter(log => log.level === level);
  }

  if (service) {
    filtered = filtered.filter(log =>
      log.service && log.service === service
    );
  }

  if (keyword) {
    filtered = filtered.filter(log =>
      log.message.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  if (from && to) {
    filtered = filtered.filter(log => {
      const logTime = new Date(log.timestamp || log.time);
      return logTime >= new Date(from) && logTime <= new Date(to);
    });
  }

  res.json(filtered);
});


app.get("/alerts", (req, res) => {
  try {
    const alerts = checkAlerts(logs);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: "Failed to evaluate alerts" });
  }
});

app.listen(PORT, () => {
  console.log(`Log API Server running on http://localhost:${PORT}`);
});