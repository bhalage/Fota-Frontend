import React from 'react';
import ReactECharts from 'echarts-for-react';

const DeepLoggerOverview = () => {
  const primaryChartOption = {
    title: {},
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['Jul 29', 'Jul 30', 'Jul 31', 'Aug 01', 'Aug 02', 'Aug 03', 'Aug 04']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Data Points Processed',
        data: [0, 0, 0, 0, 0, 0, 0],
        type: 'line',
        smooth: true
      }
    ]
  };

  const secondaryChartOption = {
    title: {
      text: 'Errors Over Time',
      left: 'center',
      top: 10
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['Jul 29', 'Jul 30', 'Jul 31', 'Aug 01', 'Aug 02', 'Aug 03', 'Aug 04']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Error Count',
        data: [0, 2, 1, 4, 0, 3, 1],
        type: 'bar',
        itemStyle: {
          color: '#f87171'
        }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">
          Total Data Points Processed in Last Hour &bull; Total Data Points Processed
        </h2>
        <ReactECharts option={primaryChartOption} style={{ height: '300px' }} />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Error Overview</h2>
        <ReactECharts option={secondaryChartOption} style={{ height: '300px' }} />
      </div>
    </div>
  );
};

export default DeepLoggerOverview;
