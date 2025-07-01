// import React, {useEffect, useState} from "react";
// import axios from 'axios';
// import Plot from 'react-plotly.js';
// import AlleleSelector from './components/AlleleSelector';

// function App() {
//   const [heatmapData, setHeatmapData] = useState(null);
//   const [selection, setselection] = useState({
//     allele: "Some Allele",
//     region: "Some Region",
//     timeperiod: "Some Timeperiod"
//   });

//   const handleSelectionChange = (newSelection) =>{
//     setselection(newSelection);
//   };
  
//   useEffect(() => {
//     const fetchData = async() =>{
//       try{
//       const response = await axios.get('http://localhost:8000/heatmap-data',{
//         params:{
//           allele: selection.allele,
//           region: selection.regions,
//           period: selection.timeperiods
//         }
//       });
//       console.log('Data recieved:', response.data);
//       setHeatmapData(response.data);}
//       catch(err){
//         console.error('Error fetching data', err);
//       }
//     }
//     fetchData();},[selection]);
//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Allele Frequency Heatmap</h2>

//       <AlleleSelector onSelectionChange={handleSelectionChange} />

//       {!heatmapData ? (
//         <div>Loading HeatMap Data...</div>
//       ) : (
//         <Plot
//           data={[
//             {
//               x: heatmapData.xLabels,
//               y: heatmapData.yLabels,
//               z: heatmapData.data,
//               type: 'heatmap',
//               colorscale: 'Viridis',
//               showscale: true,
//             },
//           ]}
//           layout={{
//             width: 700,
//             height: 500,
//             title: 'Allele Frequencies',
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

import React from "react";
import AlleleHeatmap from "./components/AlcoholHeatMap";

function App() {
  return (
    <div>
      <AlleleHeatmap />
    </div>
  );
}

export default App;