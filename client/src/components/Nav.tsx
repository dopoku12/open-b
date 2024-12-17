import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import Home from '../pages/CallStats';
import CrimeData from '../pages/CrimeStats';
import Map from '../pages/MapComponent';

const Nav = () => {
  const pages = [
    {
      name: "Bmore 911 Call's (2013-2023)",
      link: '/',
    },
    {
      name: 'Bmore Crime Data (2013-2023)',
      link: '/CrimeStats',
    },
    {
      name: 'Map',
      link: '/Map',
    },
  ];

  return (
    <Box>
      <Tabs>
        <TabList>
          {pages.map((page, id) => (
            <Tab key={id}>
              <Link to={page.link}>{page.name}</Link>
            </Tab>
          ))}
        </TabList>
        {/* <TabPanels>
          <TabPanel>
            <Home />
          </TabPanel>
          <TabPanel>
            <CrimeData />
          </TabPanel>
          <TabPanel>
            <Map />
          </TabPanel>
        </TabPanels> */}
      </Tabs>
    </Box>
  );
};

export default Nav;
