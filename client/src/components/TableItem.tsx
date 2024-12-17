import { Box, Table, Text, Thead, Tbody, Tr, Th, Td, Select, Grid, GridItem, Button, useTheme } from '@chakra-ui/react';
import { useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

type TableRow = {
  [key: string]: string | number; // This makes the TableRow type more flexible, allowing any key-value pairs
};

type Props = {
  tableData: TableRow[]; // Array of table data rows
  title: string; // Title of the table
  columnsToExclude?: string[]; // Allow excluding certain columns, defaults to ['callDateTime']
};

export const TableItem = ({ tableData, title, columnsToExclude = ['callDateTime'] }: Props) => {
  const [numRows, setNumRows] = useState(10); // State to manage the number of rows to display
  const [selectedColumn, setSelectedColumn] = useState(''); // State to manage the selected column for filtering
  const [selectedValue, setSelectedValue] = useState(''); // State to manage the selected value for filtering
  const [selectedYear, setSelectedYear] = useState<number | ''>(''); // State to manage the selected year for filtering
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // State to manage the sorting order

  const theme = useTheme(); // Access the Chakra UI theme

  const thead = tableData.length > 0 ? Object.keys(tableData[0]) : []; // Get table headers from the first row of data
  const filteredThead = thead.filter(column => !columnsToExclude.includes(column)); // Filter out excluded columns

  // Filter data based on the selected column and value
  const filteredData = selectedColumn && selectedValue
    ? tableData.filter(row => row[selectedColumn] === selectedValue)
    : tableData;

  // Handle year change for filtering by year
  const handleYearChange = (year: string) => {
    setSelectedYear(year ? parseInt(year) : '');
  };

  // Filter data based on the selected year
  const filteredByYear = selectedYear
    ? filteredData.filter(row => new Date(row.callDateTime as number).getFullYear() === selectedYear)
    : filteredData;

  // Sort data based on callDateTime and sort order
  const sortedData = [...filteredByYear].sort((a, b) => {
    return sortOrder === 'asc'
      ? (a.callDateTime as number) - (b.callDateTime as number)
      : (b.callDateTime as number) - (a.callDateTime as number);
  });

  const viewOption = sortedData.slice(0, numRows); // Slice data based on the number of rows to display

  // Convert timestamp to local date string
  const convertToLocalDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  // Get row color based on priority
  const getRowColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return theme.colors.red[500];
      case 'Medium':
        return theme.colors.orange[400];
      case 'Low':
        return theme.colors.blue[400];
      case 'Non-Emergency':
        return theme.colors.green[400];
      default:
        return 'white';
    }
  };

  return (
    <Box bg="whiteAlpha.900" p={5} borderRadius="md" boxShadow="lg" overflowX="auto">
      <Grid templateColumns={{ base: "1fr", md: "repeat(7, 1fr)" }} gap={4} mb={3} alignItems="center">
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <Text fontSize="2xl" mb={5} color="black">
            {title} {/* Display the dynamic title */}
          </Text>
        </GridItem>
        <GridItem>
          <Select
            value={numRows}
            onChange={(e) => setNumRows(Number(e.target.value))}
            color="black"
            size="sm"
          >
            {[10, 20, 30, 40, 50].map(num => (
              <option key={num} value={num}>{num} rows</option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <Select
            placeholder="Select Column"
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
            color="black"
            size="sm"
          >
            {filteredThead.map((column, index) => (
              <option key={index} value={column}>{column}</option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <Select
            placeholder="Select Value"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            color="black"
            size="sm"
            disabled={!selectedColumn}
          >
            {selectedColumn
              ? [...new Set(tableData.map(row => row[selectedColumn]))].map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))
              : null}
          </Select>
        </GridItem>
        <GridItem>
          <Select
            placeholder="Select Year"
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            color="black"
            size="sm"
          >
            {[...Array(11).keys()].map(i => {
              const year = 2013 + i;
              return (
                <option key={year} value={year}>{year}</option>
              );
            })}
          </Select>
        </GridItem>
      </Grid>
      <Box overflowX="auto">
        <Table variant="simple" colorScheme="yellow">
          <Thead>
            <Tr>
              {thead.map((i, id) => (
                <Th key={id} color="white" bg="black">
                  {i} {/* Display the table headers */}
                  {i === 'callDateTime' && (
                    <Box display="inline-flex" ml={2}>
                      <Button
                        size="xs"
                        onClick={() => setSortOrder('asc')}
                        bg="transparent"
                        color={sortOrder === 'asc' ? 'yellow.300' : 'white'}
                        _hover={{ bg: 'yellow.100' }}
                      >
                        <FaArrowUp />
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => setSortOrder('desc')}
                        bg="transparent"
                        color={sortOrder === 'desc' ? 'yellow.300' : 'white'}
                        _hover={{ bg: 'yellow.100' }}
                      >
                        <FaArrowDown />
                      </Button>
                    </Box>
                  )}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {viewOption.map((row, rowIndex) => (
              <Tr key={rowIndex} _hover={{ bg: "yellow.100" }} bg={getRowColor(row.priority as string)}>
                {thead.map((key, colIndex) => (
                  <Td key={colIndex} color="black">
                    {key === 'callDateTime' ? convertToLocalDate(row[key] as number) : row[key]} {/* Display cell data, converting callDateTime to local date */}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
