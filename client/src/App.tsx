import { useMemo } from 'react';
import { Box, Grid, GridItem, useTheme } from '@chakra-ui/react';
import { FaPhoneAlt, FaExclamationCircle, FaExclamationTriangle, FaRegSmile, FaInfoCircle } from 'react-icons/fa';
import { useGet } from './hooks/useGet';
import { StatCard } from './components/StatCard';
import { TableItem } from './components/TableItem';
import PieChart from "./components/PieChart";
import CallDataGraph from './components/CallDataGraph';

type TableRow = {
  callDateTime: number;
  Neighborhood: string;
  PoliceDistrict: string;
  description: string;
  priority: string;
  location: string;
  ZIPCode: string;
};

const App = () => {
  const url = 'http://localhost:8080/api';
  const { data } = useGet(url);
  const { callData } = data;

  const theme = useTheme(); // Access theme

  const cachedData = useMemo(() => {
    const priority = [
      { priority: 'High', color: theme.colors.red[500], icon: FaExclamationCircle },
      { priority: 'Medium', color: theme.colors.orange[400], icon: FaExclamationTriangle },
      { priority: 'Low', color: theme.colors.blue[400], icon: FaInfoCircle },
      { priority: 'Non-Emergency', color: theme.colors.green[400], icon: FaRegSmile }
    ];

    const tableData = callData.map(i => ({
      callDateTime: i.callDateTime,
      Neighborhood: i.Neighborhood,
      PoliceDistrict: i.PoliceDistrict,
      description: i.description,
      priority: i.priority,
      location: i.location,
      ZIPCode: i.ZIPCode,
    }));

    const len = priority.map(status => ({
      name: status.priority,
      total: callData.filter(i => i.priority === status.priority).length,
      color: status.color,
      icon: status.icon
    }));

    const totalCall = len.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);

    const yearCountsByPriority = priority.map(i => {
      const yearCounts = tableData.reduce((acc, table) => {
        if (i.priority === table.priority) {
          const year = new Date(table.callDateTime).getFullYear();
          if (!acc[year]) {
            acc[year] = 0;
          }
          acc[year]++;
        }
        return acc;
      }, {} as Record<number, number>);

      return {
        priority: i.priority,
        counts: yearCounts
      };
    });

    // Prepare data for graph
    const graphData = Object.keys(yearCountsByPriority[0].counts).map(year => {
      const yearNum = parseInt(year);
      return {
        year: yearNum,
        ...yearCountsByPriority.reduce((acc, curr) => {
          acc[curr.priority] = curr.counts[yearNum] || 0;
          return acc;
        }, {} as Record<string, number>)
      };
    });

    return { totalCall, len, tableData, graphData };
  }, [callData, theme]);

  const { totalCall, len, tableData, graphData } = cachedData;

  return (
    <Box
      bg="white"
      color="black"
      minH="100vh"
      p={5}
    >
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={5}>
        <GridItem colSpan={4}>
          <StatCard
            icon={FaPhoneAlt}
            label="Total call's"
            value={totalCall}
            color='black'
          />
        </GridItem>

        {len.map((i, id) => (
          <GridItem key={id} colSpan={1}>
            <StatCard
              icon={i.icon}
              label={`Call Priority : ${i.name}`}
              value={i.total}
              color={i.color}
            />
          </GridItem>
        ))}
      </Grid>
      <PieChart data={len} />
      <CallDataGraph data={graphData} /> {/* Add the graph component */}
      <TableItem tableData={tableData}/>
    </Box>
  );
};

export default App;
