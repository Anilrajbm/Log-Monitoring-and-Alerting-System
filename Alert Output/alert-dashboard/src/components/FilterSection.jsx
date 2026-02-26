import { useState } from "react";

function FilterSection({ onSearch }) {
  const [level, setLevel] = useState("");
  const [keyword, setKeyword] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSearch = () => {
    onSearch({ level, keyword, from, to });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Search & Filter</h2>

      <div className="grid grid-cols-2 gap-4">
        <select
          className="border p-2 rounded"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
          <option value="DEBUG">DEBUG</option>
        </select>

        <input
          type="text"
          placeholder="Keyword"
          className="border p-2 rounded"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input
          type="datetime-local"
          className="border p-2 rounded"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          type="datetime-local"
          className="border p-2 rounded"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default FilterSection;