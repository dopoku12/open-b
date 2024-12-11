import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

type CallDataGraphProps = {
  data: {
    year: number;
    [priority: string]: number;
  }[];
};

const CallDataGraph = ({ data }: CallDataGraphProps) => {
const priorities = Object.keys(data[0]).filter(key => key !== 'year');

const options: ApexOptions = {
    chart: {
        type: 'area',
        height: 350,
    },
    title: {
        text: '911 Calls from 2013 to 2024',
        align: 'center',
    },
    xaxis: {
      categories: data.map(d => d.year.toString()), // Convert years to string for x-axis
    },
    yaxis: {
        title: {
            text: 'Total Calls',
        },
    },
    tooltip: {
        x: {
            format: 'yyyy',
        },
    },
};

    const series = priorities.map(priority => ({
    name: priority,
    data: data.map(d => d[priority] || 0),
    }));

    return <Chart options={options} series={series} type="line" height={350} />;
};

export default CallDataGraph;
