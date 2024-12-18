import { Link } from 'react-router-dom';
import { Box, Tabs, TabList, Tab } from '@chakra-ui/react';

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
  ];

  return (
    <Box>
      <Tabs>
        <TabList>
          {pages.map((page, id) => (
            <Tab key={id} as={Link} to={page.link}>
              {page.name}
            </Tab>
          ))}
        </TabList>
      </Tabs>
    </Box>
  );
};

export default Nav;
