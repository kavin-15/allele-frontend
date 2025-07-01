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
  const [variantId, setVariantId] = useState("4-99318162-T-C");
  const [freqData, setfreqData] = useState(null);
  const [loading, setloading] = useState(false);

  const exampleVariants = [
    {id: "4-99318162-T-C", label: "ADH1B Variant"},
    {id: "4-100239319-T-C", label: "Another Example of Variant"}
  ];
  useEffect(()=>{
    const fetchData = async() =>{
      setloading(true);
      try{
        const res = await axios.get("http://localhost:8000/allele-frequency",{
          params:{variant_id: variantId}
        });
        console.log("Data recieved:", res.data);
        setfreqData(res.data.frequencies);
      } catch(err){
        console.error("Error fetching allele data", err);
      }finally{
        setloading(false);
      }
    };
    fetchData();
  }, [variantId]);

  const renderPlot = () => {
  if (!freqData) return null;

  const continents = Object.keys(freqData);
  const frequencies = continents.map(cont => freqData[cont]);

  return (
    <Plot
      data={[
        {
          z: [frequencies],
          x: continents,
          y: ["Allele Frequency"],
          type: "heatmap",
          colorscale: [
            [0, 'rgb(68, 1, 84)'],
            [0.3, 'rgb(59, 82, 139)'],
            [0.5, 'rgb(33, 145, 140)'],
            [0.7, 'rgb(94, 201, 98)'],
            [0.9, 'rgb(253, 231, 37)'],
            [1, 'rgb(255, 255, 255)']
          ],
          zmin: 0.3,
          zmax: 1.0,
          showscale: true,
          text: frequencies.map(f => f.toFixed(3)),
          hoverinfo: "x+y+text"
        }
      ]}
      layout={{
        title: `Allele Frequency Heatmap for ${variantId}`,
        width: 700,
        height: 300,
        xaxis: {
          title: "Continent",
          tickangle: -45
        },
        yaxis: {
          visible: false
        },
        margin: { t: 50, l: 50, r: 50, b: 50 }
      }}
    />
  );
};





  return (
    <div style={{ padding: "20px" }}>
      <h2>Allele Frequency Visualizer</h2>
      <label>
        Select Variant:
        <select
          value={variantId}
          onChange={(e) => setVariantId(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          {exampleVariants.map((variant) => (
            <option key={variant.id} value={variant.id}>
              {variant.label}
            </option>
          ))}
        </select>
      </label>

      {loading ? <p>Loading allele frequency data...</p> : renderPlot()}
    </div>
  );
}
export default AlcoholHeatmap;
