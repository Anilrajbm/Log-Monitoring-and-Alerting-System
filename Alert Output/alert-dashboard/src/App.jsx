import { useState } from "react";
import FilterSection from "./components/FilterSection";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  const handleSearch = async ({ level, keyword, from, to }) => {
    try {
      const params = new URLSearchParams();

      if (level) params.append("level", level);
      if (keyword) params.append("keyword", keyword);
      if (from) params.append("from", from);
      if (to) params.append("to", to);

      const url = `http://localhost:6000/logs${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      console.log("Searching logs with filters:", {
        level,
        keyword,
        from,
        to,
        url,
      });

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        console.error(
          "Error response from /logs:",
          response.status,
          errorText,
        );
        throw new Error(
          `Failed to fetch logs (${response.status}). ${
            errorText || "Please check that the Log API server is running."
          }`,
        );
      }

      const data = await response.json();
      setFilteredLogs(data);
    } catch (err) {
      console.error("Search failed:", err);
      alert(err.message || "Something went wrong while searching logs.");
    }
  };

  const fetchAlerts = async () => {
    const response = await fetch("http://localhost:6000/alerts");
    const data = await response.json();
    setAlerts(data);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      setAlerts(data.alerts || []);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* This is the header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Log Monitoring & Alert Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Upload log file and monitor active alerts
        </p>
      </div>

      {/* Upload file Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Log File</h2>

        <div className="flex items-center gap-4">
          <input
            type="file"
            className="border p-2 rounded w-full"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleUpload}
          >
            Upload & Process
          </button>

          {alerts.map((alert, index) => (
            <div key={index} className="border p-4 rounded mb-2 bg-red-100">
              <p>
                <strong>{alert.name}</strong> ({alert.severity})
              </p>
              <p>{alert.reason}</p>
              <p>Count: {alert.stats.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Component of filter */}
      <FilterSection onSearch={handleSearch} />

      {/* filter logs */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Filtered Logs</h2>

        {filteredLogs.length === 0 ? (
          <p>No logs found.</p>
        ) : (
          filteredLogs.map((log, index) => (
            <div key={index} className="border p-3 mb-2 rounded">
              <p>
                <strong>Time:</strong> {log.time}
              </p>
              <p>
                <strong>Level:</strong> {log.level}
              </p>
              <p>
                <strong>Message:</strong> {log.message}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Loading Placeholder */}
      {loading && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <p className="text-blue-600 font-medium">Processing logs...</p>
        </div>
      )}

      {/* Alerts Section */}
      {!loading && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Active Alerts</h2>

          {alerts.length === 0 ? (
            <p className="text-gray-500">No active alerts.</p>
          ) : (
            alerts.map((alert, index) => (
              <div
                key={index}
                className="border border-red-300 bg-red-50 p-4 rounded-lg mb-4"
              >
                <h3 className="font-bold text-red-700">{alert.name}</h3>
                <p className="text-sm mt-2">{alert.reason}</p>
                <div className="text-sm mt-2 text-gray-700">
                  {JSON.stringify(alert.stats, null, 2)}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
