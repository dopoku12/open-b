import { useMemo } from "react";
import { TableRow, GraphData } from "../Types/msicTypes";
import { useTheme } from "@chakra-ui/react";
import { FaExclamationCircle, FaExclamationTriangle, FaRegSmile, FaInfoCircle } from 'react-icons/fa';
import { CallService } from "../Types/Gettypes";

// Function to get counts of calls per year, categorized by priority
const getYearCountsByPriority = (tableData: TableRow[], priorities: string[]): Record<string, Record<number, number>> => {
  return priorities.reduce((acc, priority) => {
    acc[priority] = tableData.reduce((priorityAcc, row) => {
      if (row.priority === priority) {
        const year = new Date(row.callDateTime).getFullYear();
        priorityAcc[year] = (priorityAcc[year] || 0) + 1;
      }
      return priorityAcc;
    }, {} as Record<number, number>);
    return acc;
  }, {} as Record<string, Record<number, number>>);
};

// Function to prepare data for graph representation
const prepareGraphData = (yearCountsByPriority: Record<string, Record<number, number>>): GraphData => {
  return Object.keys(yearCountsByPriority['High']).map(year => {
    const yearNum = parseInt(year);
    return {
      year: yearNum,
      High: yearCountsByPriority['High'][yearNum] || 0,
      Medium: yearCountsByPriority['Medium'][yearNum] || 0,
      Low: yearCountsByPriority['Low'][yearNum] || 0,
      'Non-Emergency': yearCountsByPriority['Non-Emergency'][yearNum] || 0
    };
  });
};

// Custom hook to cache call data and prepare necessary data for display
const memoizeCall = ( callData :CallService ) => {
  const theme = useTheme(); // Accessing the Chakra UI theme

  return useMemo(() => {
   const priorities = ['High', 'Medium', 'Low', 'Non-Emergency'];

    // Transforming raw call data into a more usable format
    const tableData: TableRow[] = callData.map(i => ({
      callDateTime: i.callDateTime,
      Neighborhood: i.Neighborhood,
      PoliceDistrict: i.PoliceDistrict,
      description: i.description,
      priority: i.priority,
      location: i.location,
      ZIPCode: i.ZIPCode,
    }));

    // Calculating the total number of calls for each priority level
    const len = priorities.map(priority => ({
      name: priority,
      total: callData.filter(i => i.priority === priority).length,
      color: theme.colors[priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : priority === 'Low' ? 'blue' : 'green'][500],
      icon: priority === 'High' ? FaExclamationCircle : priority === 'Medium' ? FaExclamationTriangle : priority === 'Low' ? FaInfoCircle : FaRegSmile
    }));

    // Calculating the total number of calls
    const totalCall = len.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);

    // Getting counts of calls per year categorized by priority
    const yearCountsByPriority = getYearCountsByPriority(tableData, priorities);

    // Preparing graph data from year counts by priority
    const graphData = prepareGraphData(yearCountsByPriority);

    // Caching all prepared data
    const cachedData = { totalCall, len, tableData, graphData };
    return cachedData; // Memoized data to prevent unnecessary recalculations
  }, [callData, theme]); 
};

export default memoizeCall;
