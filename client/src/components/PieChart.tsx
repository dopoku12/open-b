import Chart from 'react-apexcharts';
import { useTheme } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';

type Props={
data: {
    name: string;
    total: number;
}[]
}
const PieChart = ({ data }:Props) => {
  const theme = useTheme();

  const options:ApexOptions = {
    labels: data.map(item => item.name),
    colors: [theme.colors.brand.red, theme.colors.brand.yellow, theme.colors.brand.black],
    legend: {
      position: 'bottom',
    },
  };

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
