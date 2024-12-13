import { Box, Grid, GridItem} from '@chakra-ui/react';
import { FaPhoneAlt } from 'react-icons/fa';

import { useGet } from './hooks/useGet';
import useCache from './hooks/useCache';

import { StatCard } from './components/StatCard';
import { TableItem } from './components/TableItem';
import PieChart from "./components/PieChart";
import CallDataGraph from './components/CallDataGraph';

const App = () => {
  const url = 'http://localhost:8000/api';
  const { data } = useGet(url);
  const { callData } = data

  const cachedData= useCache(callData);

  const { totalCall, len, tableData, graphData }=cachedData

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
      <CallDataGraph data={graphData} />
      <TableItem tableData={tableData} />
    </Box>
  );
};

export default App;
