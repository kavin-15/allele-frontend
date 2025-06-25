import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

const AlcoholHeatmap = () => {
  const [continent, setContinent] = useState("All");
  const [heatmapData, setHeatmapData] = useState(null);
  const [loading, setLoading] = useState(true);

  const continents = ["All", "Africa", "Asia", "Europe"];
  const colorScales = {
    Africa: "Blues",
    Asia: "Reds",
    Europe: "Greens"
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/alcohol-consumption-heatmap", {
        params: { continent }
      })
      .then((res) => {
        setHeatmapData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching alcohol data:", err);
        setLoading(false);
      });
  }, [continent]);

  const renderHeatmap = () => {
    if (!heatmapData) return null;

    if (heatmapData.type === "multi") {
        const allCountries = [];
        const allZRows = [];
        let xLabels = [];

        heatmapData.data.forEach(trace => {
            if (!xLabels.length) xLabels = trace.xLabels; // use x from first trace
            trace.yLabels.forEach((country, i) => {
            allCountries.push(`${country} (${trace.continent})`);
            allZRows.push(trace.zData[i]);
            });
        });

    return (
        <Plot
        data={[
            {
            x: xLabels,
            y: allCountries,
            z: allZRows,
            type: "heatmap",
            colorscale: "Viridis",
            showscale: true
            }
        ]}
        layout={{
            title: "Alcohol Consumption – All Continents",
            width: 1000,
            height: allCountries.length * 30, // dynamic height
            margin: { t: 50, l: 150, r: 50, b: 0 }
        }}
        />
    );
    }

    if (heatmapData.type === "single") {
      const data = heatmapData.data;
      return (
        <Plot
          data={[
            {
              x: data.xLabels,
              y: data.yLabels,
              z: data.zData,
              type: "heatmap",
              colorscale: "Viridis",
              showscale: true
            }
          ]}
          layout={{
            title: `Alcohol Consumption – ${continent}`,
            width: 700,
            height: 400
          }}
        />
      );
    }

    return null;
  };

  const containerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(700px, 1fr))",
  gap: "40px",
  marginTop: "20px"
};


  return (
    <div style={{ padding: "20px" }}>
      <h2>Alcohol Consumption Heatmap</h2>
      <label>
        Select Continent:{" "}
        <select value={continent} onChange={(e) => setContinent(e.target.value)}>
          {continents.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      {loading ? <p>Loading heatmap...</p> : renderHeatmap()}
    </div>
  );
};

export default AlcoholHeatmap;
