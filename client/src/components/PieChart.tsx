import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

type Props={
  data: {
    name: string;
    total: number;
    color: string;
  }[]
}

const PieChart = ({ data }: Props) => {

  const options: ApexOptions = {
    labels: data.map(item => item.name),
    colors: data.map(item => item.color), // Use the colors from the data
    legend: {
      position: 'bottom',
    },
  };
console.log(options)
  const series = data.map(item => item.total);

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      width="380"
    />
  );
};

export default PieChart;
