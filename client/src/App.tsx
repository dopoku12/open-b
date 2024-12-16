import { Box, SimpleGrid, GridItem, Spinner} from '@chakra-ui/react';
import { FaPhoneAlt } from 'react-icons/fa';

import { useGet } from './hooks/useGet';
import useCache from './hooks/useCache';

import { StatCard } from './components/StatCard';
import { TableItem } from './components/TableItem';
import PieChart from './components/PieChart';
import CallDataGraph from './components/CallDataGraph';
import { Info } from './components/Info';

const App = () => {
  const url = 'https://openb-serv.azurewebsites.net/api';
  const { data, load } = useGet(url);  // Include load state from useGet hook
  const { callData } = data || {};

  const cachedData = useCache(callData);

  const { totalCall, len, tableData, graphData } = cachedData || {};


  return (
    <Box
      bg="white"
      color="black"
      minH="100vh"
      p={5}
    >
      {!load ? (
        <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
          <Spinner size="xl" color="blue.500" />
        </Box>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} mb={5}>
            <GridItem colSpan={1}>
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
          </SimpleGrid>
          <PieChart data={len} />
          <CallDataGraph data={graphData} />
          <TableItem tableData={tableData} />
          <footer style={{ textAlign: 'center', marginTop: '2rem' }}>
            by David Opoku ©2024
          </footer>
      <Info/>
        </>
      )}
    </Box>
  );
};

export default App;
