// components/VehicleChart.jsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import DeepLoggerOverview from './DeepLoggerOverview';

const VehicleChart = () => {
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Total Active Vehicles', 'Total Provisioned Vehicles']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        'Jul 28, 2025', 'Jul 29, 2025', 'Jul 30, 2025', 'Jul 31, 2025',
        'Aug 01, 2025', 'Aug 02, 2025', 'Aug 03, 2025'
      ]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Total Active Vehicles',
        type: 'line',
        data: [12, 10, 12, 11, 8, 1, 2],
        itemStyle: {
          color: '#FFA500' // orange
        },
        smooth: true
      },
      {
        name: 'Total Provisioned Vehicles',
        type: 'line',
        data: [1, 1, 1, 1, 1, 0, 1],
        itemStyle: {
          color: '#2ecc71' // green
        },
        smooth: true
      }
    ]
  };

  return (<>
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">Vehicle Metrics</h2>
      <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
    </div>
    <DeepLoggerOverview/>
    </>
    
  );
};

export default VehicleChart;
