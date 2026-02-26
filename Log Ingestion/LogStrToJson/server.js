const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

let logs = [];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});



const upload = multer({ storage });



app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const filePath = req.file.path;
    const logData = fs.readFileSync(filePath, "utf-8");
    const lines = logData.split("\n");

    const logsList = [];

    lines.forEach((line) => {
      line = line.trim();
      if (!line) return;

      const parts = line.split(/\s+/);
      const date = parts[0];
      const timePart = parts[1];

      const levelMatch = line.match(/\b(INFO|WARN|ERROR|DEBUG)\b/);
      if (!levelMatch) return;

      const level = levelMatch[0];
      const messageStartIndex = line.indexOf(level) + level.length;
      const message = line.substring(messageStartIndex).trim();

      logsList.push({
        time: `${date} ${timePart}`,
        level,
        message,
      });
    });



    //Store in memory
    logs = logsList;

    console.log(logs);
    

    
    await fetch("http://localhost:6000/receive-logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logs),
    });



    //Send response back to frontend
    res.json({
      message: "Logs processed and forwarded successfully",
      count: logs.length
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Processing failed" });
  }


});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});