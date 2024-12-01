import { Box, Table, Text, Thead, Tbody, Tr, Th, Td, Select, Grid, GridItem } from '@chakra-ui/react';
import { useState } from 'react';

type TableRow = {
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
    const [numRows, setNumRows] = useState(5);
    const [selectedColumn, setSelectedColumn] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    const thead = tableData.length > 0 ? Object.keys(tableData[0]) : [];

    const filteredData = selectedColumn && selectedValue 
        ? tableData.filter(row => row[selectedColumn as keyof TableRow] === selectedValue)
        : tableData;

    const viewOption = filteredData.slice(0, numRows);

    return (
        <Box bg="red.600" p={5} borderRadius="md" boxShadow="lg">
            <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={3} alignItems="center">
                <GridItem colSpan={3}>
                    <Text fontSize="xl" color="white">
                        Sales by Country
                    </Text>
                </GridItem>
                <GridItem>
                    <Select 
                        value={numRows} 
                        onChange={(e) => setNumRows(Number(e.target.value))} 
                        bg="yellow.300"
                        color="black"
                        size="sm"
                    >
                        {[5, 10, 15, 20].map(num => (
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
            </Grid>
            <Table variant="simple" colorScheme="yellow">
                <Thead>
                    <Tr>
                        {thead.map((i, id) => <Th key={id} color="white" bg="black">{i}</Th>)}
                    </Tr>
                </Thead>
                <Tbody>
                    {viewOption.map((row, rowIndex) => (
                        <Tr key={rowIndex} _hover={{ bg: "yellow.100" }}>
                            {thead.map((key, colIndex) => (
                                <Td key={colIndex} color="black" bg="white">{row[key as keyof TableRow]}</Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};
