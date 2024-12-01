import { useMemo } from 'react';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { FaPhoneAlt, FaExclamationCircle, FaExclamationTriangle, FaRegSmile } from 'react-icons/fa';
import { isCallService } from './Types/TypeGuards';
import { useGet } from './hooks/useGet';
import { StatCard } from './components/StatCard';
import { TableItem } from './components/TableItem';
import PieChart from "./components/PieChart";

const App = () => {
  const url = 'http://localhost:8080/api';
  const { data} = useGet(url);

  const callData = useMemo(() => {
    if (!isCallService(data)) {
      return { totalCall: 0, len: [{ name: "", total: 0 }], tableData: [] };
    }

    const priority = ['High', 'Medium', 'Non-Emergency'];

    const tableData = data.map(i => ({
      Neighborhood: i.Neighborhood,
      PoliceDistrict: i.PoliceDistrict,
      description: i.description,
      priority: i.priority,
      location: i.location,
      ZIPCode: i.ZIPCode,
    }));

    const len = priority.map(status => ({
      name: status,
      total: data.filter(i => i.priority === status).length,
    }));

    const totalCall = len.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);

    return { totalCall, len, tableData };
  }, [data]);

  const { totalCall, len, tableData } = callData;

  return (
    <Box
      bg="white"
      color="black"
      minH="100vh"
      p={5}
    >
      <Text
        fontSize="2xl"
        mb={5}
        color="red.600"
        children="Baltimore 911 Records (2013-2022)"
      />
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={5}>
        <GridItem>
          <StatCard
            icon={FaPhoneAlt}
            label="Total call's"
            value={totalCall}
          />
        </GridItem>

        {len.map((i, id) => (
          <GridItem key={id}>
            <StatCard
              icon={i.name === 'High' ? FaExclamationCircle : i.name=== 'Medium' ? FaExclamationTriangle : FaRegSmile}
              label={`Call Priority : ${i.name}`}
              value={i.total}
            />
          </GridItem>
        ))}
      </Grid>
      <PieChart data={len} />
      <TableItem tableData={tableData} />
    </Box>
  );
};

export default App;
