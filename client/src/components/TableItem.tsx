import { Box, Table, Text, Thead, Tbody, Tr, Th, Td, Select, Grid, GridItem, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

type TableRow = {
    callDateTime: number;
    Neighborhood: string;
    PoliceDistrict: string;
    description: string;
    priority: string;
    location: string;
    ZIPCode: string;
};

type Props = {
    tableData: TableRow[]
};

export const TableItem = ({ tableData }: Props) => {
    const [numRows, setNumRows] = useState(10);
    const [selectedColumn, setSelectedColumn] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedYear, setSelectedYear] = useState<number | ''>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const thead = tableData.length > 0 ? Object.keys(tableData[0]) : [];

    const filteredData = selectedColumn && selectedValue
        ? tableData.filter(row => row[selectedColumn as keyof TableRow] === selectedValue)
        : tableData;

    const handleYearChange = (year: string) => {
        setSelectedYear(year ? parseInt(year) : '');
    };

    const filteredByYear = selectedYear
        ? filteredData.filter(row => new Date(row.callDateTime).getFullYear() === selectedYear)
        : filteredData;

    const sortedData = [...filteredByYear].sort((a, b) => {
        return sortOrder === 'asc'
            ? a.callDateTime - b.callDateTime
            : b.callDateTime - a.callDateTime;
    });

    const viewOption = sortedData.slice(0, numRows);

    const convertToLocalDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    return (
        <Box bg="red.600" p={5} borderRadius="md" boxShadow="lg">
            <Grid templateColumns="repeat(7, 1fr)" gap={1} mb={3} alignItems="center">
                <GridItem colSpan={3}>
                    <Text
                        fontSize="2xl"
                        mb={5}
                        color="white"
                        children="Baltimore 911 Records (2013-2023)"
                    />
                </GridItem>
                <GridItem>
                    <Select 
                        value={numRows} 
                        onChange={(e) => setNumRows(Number(e.target.value))} 
                        bg="yellow.300"
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
                        bg="yellow.300" 
                        color="black" 
                        size="sm"
                    >
                        {thead.map((column, index) => (
                            <option key={index} value={column}>{column}</option>
                        ))}
                    </Select>
                </GridItem>
                <GridItem>
                    <Select 
                        placeholder="Select Value" 
                        value={selectedValue} 
                        onChange={(e) => setSelectedValue(e.target.value)} 
                        bg="yellow.300" 
                        color="black" 
                        size="sm"
                        disabled={!selectedColumn}
                    >
                        {selectedColumn 
                            ? [...new Set(tableData.map(row => row[selectedColumn as keyof TableRow]))].map((value, index) => (
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
                        bg="yellow.300"
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
            <Table variant="simple" colorScheme="yellow">
                <Thead>
                    <Tr>
                        {thead.map((i, id) => (
                            <Th key={id} color="white" bg="black">
                                {i}
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
                        <Tr key={rowIndex} _hover={{ bg: "yellow.100" }}>
                            {thead.map((key, colIndex) => (
                                <Td key={colIndex} color="black" bg="white">
                                    {key === 'callDateTime' ? convertToLocalDate(row[key as keyof TableRow] as number) : row[key as keyof TableRow]}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};
