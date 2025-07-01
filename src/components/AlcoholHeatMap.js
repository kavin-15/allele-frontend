import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

// const AlcoholHeatmap = () => {
//   const [continent, setContinent] = useState("All");
//   const [heatmapData, setHeatmapData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const continents = ["All", "Africa", "Asia", "Europe"];
//   const colorScales = {
//     Africa: "Blues",
//     Asia: "Reds",
//     Europe: "Greens"
//   };

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("http://localhost:8000/alcohol-consumption-heatmap", {
//         params: { continent }
//       })
//       .then((res) => {
//         setHeatmapData(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching alcohol data:", err);
//         setLoading(false);
//       });
//   }, [continent]);

//   const renderHeatmap = () => {
//     if (!heatmapData) return null;

//     if (heatmapData.type === "multi") {
//       const containerStyle = {
//         display:"grid",
//         gridTemplateColumns:"repeat(2, 1fr)",
//         justifyItems: "center",
//         gap: "30px",
//         marginTop: "30px"
//       };
//       return (
//         <div style ={containerStyle}>
//           {heatmapData.data.map((trace, idx) => (
//             <Plot
//               key={idx}
//               data={[
//                 {
//                   x: trace.xLabels,
//                   y: trace.yLabels,
//                   z: trace.zData,
//                   type: "heatmap",
//                   colorscale: colorScales[trace.continent] || "Viridis",
//                   showscale: false
//                 }
//               ]}
//               layout={{
//                 title: `Alcohol Consumption – ${trace.continent}`,
//                 width: 700,
//                 height: 400
//               }}
//         />
//       ))}
//       </div>
//       );
//     }

//     if (heatmapData.type === "single") {
//       const data = heatmapData.data;
//       return (
//         <Plot
//           data={[
//             {
//               x: data.xLabels,
//               y: data.yLabels,
//               z: data.zData,
//               type: "heatmap",
//               colorscale: "Viridis",
//               showscale: true
//             }
//           ]}
//           layout={{
//             title: `Alcohol Consumption – ${continent}`,
//             width: 700,
//             height: 400
//           }}
//         />
//       );
//     }

//     return null;
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Alcohol Consumption Heatmap</h2>
//       <label>
//         Select Continent:{" "}
//         <select value={continent} onChange={(e) => setContinent(e.target.value)}>
//           {continents.map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>
//       </label>

//       {loading ? <p>Loading heatmap...</p> : renderHeatmap()}
//     </div>
//   );
// };

const AlcoholHeatmap = () =>{
  // const [variantId, setVariantId] = useState("4-99318162-T-C");
  const [freqData, setfreqData] = useState(null);
  const [loading, setloading] = useState(false);

  // const exampleVariants = [
  //   {id: "4-99318162-T-C", label: "ADH1B Variant"},
  //   {id: "4-100239319-T-C", label: "Another Example of Variant"}
  // ];
  useEffect(()=>{
    console.log("Fetching data");
    const fetchData = async() =>{
      setloading(true);
      try{
        const res = await axios.get("http://localhost:8000/allele-frequency-multi");
        console.log("Data recieved:", res.data);
        setfreqData(res.data.frequencies);
      } catch(err){
        console.error("Error fetching allele data", err);
      }finally{
        setloading(false);
      }
    };
    fetchData();
  }, []);

  const renderPlot = () => {
  if (!freqData) return null;

  const variantLabels = {
    "4-99318162-T-C": "rs1229984 (ADH1B)",
    "1-11856378-G-A": "rs1801133 (MTHFR)",
    "11-5227002-T-A": "rs334 (HBB)",
    "1-169519049-G-A": "rs6025 (Factor V Leiden)",
    "19-45412079-T-C": "rs7412 (APOE)",
    "19-45411941-T-C": "rs429358 (APOE)",
    "12-112241766-G-A": "rs671 (ALDH2)"
  };

  const variants = Object.keys(freqData);
  const yLabels = variants.map(v => variantLabels[v] || v);
  const xLabels = ["AFR", "AMR", "EAS", "NFE", "SAS"];
  const zData = variants.map(variant => 
    xLabels.map(cont => freqData[variant][cont] || 0)
  );
  console.log("Heatmap rendering", freqData);
  return (
    <Plot
      data={[
        {
          z: zData,
          x: xLabels,
          y: yLabels,
          type: "heatmap",
          colorscale: "Viridis",
          showscale: true,
          text: zData.map(row => row.map(val => val.toFixed(3))),
          hoverinfo: "x+y+text"
        }
      ]}
      layout={{
        title: "Allele Frequency Heatmap Across Variants and Continents",
        width: 900,
        height: yLabels.length * 50 + 150,
        xaxis: { title: "Continent", tickangle: -45 },
        yaxis: { title: "Variants", automargin: true },
        margin: { t: 60, l: 200, r: 50, b: 100 }
      }}
    />
  );
};
  return (
  <div style={{ padding: "20px" }}>
    <h2>Allele Frequency Visualizer (Multi-Variant Heatmap)</h2>
    {loading ? <p>Loading allele frequency data...</p> : renderPlot()}
  </div>
);
}
export default AlcoholHeatmap;
