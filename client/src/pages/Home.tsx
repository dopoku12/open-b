import { Box,Spinner} from '@chakra-ui/react';

import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
type Props={
  load:boolean
}
const Home = ({load}:Props) => {

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
      ) :<>
      <Nav/>
      <Outlet/>
      </> }
    </Box>
  );
};

export default Home;