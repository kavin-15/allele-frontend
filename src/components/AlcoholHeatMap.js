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
      const containerStyle = {
        display:"grid",
        gridTemplateColumns:"repeat(2, 1fr)",
        justifyItems: "center",
        gap: "30px",
        marginTop: "30px"
      };
      return (
        <div style ={containerStyle}>
          {heatmapData.data.map((trace, idx) => (
            <Plot
              key={idx}
              data={[
                {
                  x: trace.xLabels,
                  y: trace.yLabels,
                  z: trace.zData,
                  type: "heatmap",
                  colorscale: colorScales[trace.continent] || "Viridis",
                  showscale: false
                }
              ]}
              layout={{
                title: `Alcohol Consumption – ${trace.continent}`,
                width: 700,
                height: 400
              }}
        />
      ))}
      </div>
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
