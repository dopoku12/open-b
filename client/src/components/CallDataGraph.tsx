import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

type CallDataGraphProps = {
  title: string;
  chartType: 'line' | 'area' | 'bar';
  data: {
    year: number;
    High: number;
    Medium: number;
    Low: number;
    'Non-Emergency': number;
  }[];
};

const CallDataGraph: React.FC<CallDataGraphProps> = ({ title, chartType, data }) => {
  const priorities: Array<keyof Omit<CallDataGraphProps['data'][0], 'year'>> = ['High', 'Medium', 'Low', 'Non-Emergency'];

  const options: ApexOptions = {
    chart: {
      type: chartType,
      height: '100%',
      toolbar: {
        show: true,
      },
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 400, // Adjust height for larger screens
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '12px',
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '12px',
              },
            },
          },
          legend: {
            fontSize: '12px',
          },
        },
      },
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 300, // Adjust height for smaller screens
          },
          title: {
            style: {
              fontSize: '12px',
            },
          },
          xaxis: {
            labels: {
              show: true,
              rotate: -45,
              style: {
                fontSize: '10px',
              },
            },
          },
          yaxis: {
            labels: {
              show: true,
              style: {
                fontSize: '10px',
              },
            },
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '10px',
          },
        },
      },
    ],
    title: {
      text: title,
      align: 'center',
      style: {
        fontSize: '16px',
      },
    },
    xaxis: {
      categories: data.map(d => d.year.toString()),
    },
    yaxis: {
      title: {
        text: 'Total Calls',
        style: {
          fontSize: '16px',
        },
      },
    },
    tooltip: {
      x: {
        format: 'yyyy',
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
    },
  };

  const series = priorities.map(priority => ({
    name: priority,
    data: data.map(d => d[priority] || 0),
  }));

  return <Chart options={options} series={series} type={chartType} height="400" />;
};

export default CallDataGraph;
