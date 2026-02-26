function checkAlerts(logs) {
  const alerts = [];

  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

  // Rule: ERROR count > 5 in last 5 minutes
  const recentErrors = logs.filter(log => {
    if (!log.level) return false;
    const logTime = new Date(log.time.replace(" ", "T"));
    return log.level === "ERROR" && logTime >= fiveMinutesAgo;
  });

  if (recentErrors.length > 5) {
    alerts.push({
      name: "High Error Rate",
      severity: "HIGH",
      reason: `More than 5 ERROR logs in last 5 minutes`,
      stats: {
        count: recentErrors.length,
        timeWindow: "5 minutes"
      }
    });
  }

  // Rule: Keyword 'timeout' appears > 3 times
  const keyword = "timeout";
  const keywordMatches = logs.filter(log =>
    log.message &&
    log.message.toLowerCase().includes(keyword)
  );

  if (keywordMatches.length > 3) {
    alerts.push({
      name: "Timeout Spike",
      severity: "LOW",
      reason: `'${keyword}' appeared more than 3 times`,
      stats: {
        count: keywordMatches.length,
        keyword
      }
    });
  }

  return alerts;
}

module.exports = { checkAlerts };