import { useMemo } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { FaPhoneAlt, FaExclamationCircle, FaExclamationTriangle, FaRegSmile, FaInfoCircle } from 'react-icons/fa';
import { useGet } from './hooks/useGet';
import { StatCard } from './components/StatCard';
import { TableItem } from './components/TableItem';
import PieChart from "./components/PieChart";

const App = () => {
  const url = 'http://localhost:8080/api';
  const { data } = useGet(url);
  const { callData, crimeData } = data;

  const cachedData = useMemo(() => {
    const priority = [
      {priority: 'High', color: "red.500",icon: FaExclamationCircle }, 
      {priority:'Medium' , color: "orange.400",icon: FaExclamationTriangle },
      {priority: 'Low', color: "blue.400",icon: FaInfoCircle },
      {priority:'Non-Emergency', color: "green.400" , icon: FaRegSmile}
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
      color:status.color,
      icon:status.icon
    }));

    const totalCall = len.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);

    return { totalCall, len, tableData };
  }, [data]);

  const { totalCall, len, tableData } = cachedData;

  return (
    <Box
      bg="white"
      color="black"
      minH="100vh"
      p={5}
    >
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={5}>
        <GridItem>
          <StatCard
            icon={FaPhoneAlt}
            label="Total call's"
            value={totalCall}
            color='black'
          />
        </GridItem>

        {len.map((i, id) => {
          return (
            <GridItem key={id}>
              <StatCard
                icon={i.icon}
                label={`Call Priority : ${i.name}`}
                value={i.total}
                color={i.color}
              />
            </GridItem>
          );
        })}
      </Grid>
      <PieChart data={len} />
      <TableItem tableData={tableData} />
    </Box>
  );
};

export default App;
