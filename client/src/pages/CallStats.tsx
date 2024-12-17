import { SimpleGrid, GridItem} from '@chakra-ui/react';
import { FaPhoneAlt } from 'react-icons/fa';

import { StatCard } from '../components/StatCard';
import { TableItem } from '../components/TableItem';
import PieChart from '../components/PieChart';
import CallDataGraph from '../components/CallDataGraph';
import { Info } from '../components/Info';

import { IconType } from 'react-icons';
import { TableRow } from '../Types/msicTypes';
import { GraphData } from '../Types/msicTypes';
import React from 'react';

type Props = {data:{
    totalCall: number;
    len: {
        name: string;
        total: number;
        color: any;
        icon: IconType;
    }[];
    tableData: TableRow[];
    graphData: GraphData;
}
}
const CallStats:React.FC<Props> = ({data}) => {
    const { totalCall, len, tableData, graphData } = data || {};
  return(
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
         <CallDataGraph 
         title="911 Calls from 2013 to 2023" 
         chartType="area" 
         data={graphData} />
          <TableItem 
          title='911 Call History'
           tableData={tableData} />
          <footer style={{ textAlign: 'center', marginTop: '2rem' }}>
            by David Opoku ©2024
          </footer>
      <Info/>
        </>
      )
}

export default CallStats

