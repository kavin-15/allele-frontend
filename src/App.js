import React, {useEffect, useState} from "react";
import axios from 'axios';
import Plot from 'react-plotly.js';

function App() {
  const [heatmapData, setHeatmapData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/heatmap-data')
      .then((res) => {
        console.log('Data received', res.data);
        setHeatmapData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching heatmap data:', err);
      })
  }, []);
  if(!heatmapData)
    return <div>Loading HeatMap Data</div>;
  const {xLabels, yLabels, data} = heatmapData;

  return(
    <div style={{padding: '20px'}}>
      <h2>Allele HeatMap</h2>
      <Plot
        data={[{
          x: heatmapData.xLabels,
          y: heatmapData.yLabels,
          z: heatmapData.data,
          type: 'heatmap',
          colorscale:'Viridis',
          showscale: true,
        }
        ]}layout={{
          width:700,
          height: 500,
          title:'Allele Frequencies'
        }}
      />
    </div>
  );
}
export default App;