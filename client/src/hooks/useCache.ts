import { useMemo } from "react";
import { TableRow, GraphData } from "../Types/msicTypes";
import { useTheme } from "@chakra-ui/react";
import { FaExclamationCircle, FaExclamationTriangle, FaRegSmile, FaInfoCircle } from 'react-icons/fa';
import { CallService } from "../Types/Gettypes";

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

const useCache = ( callData :CallService ) => {
  const theme = useTheme();

  return useMemo(() => {
    const priorities = ['High', 'Medium', 'Low', 'Non-Emergency'];

    const tableData: TableRow[] = callData.map(i => ({
      callDateTime: i.callDateTime,
      Neighborhood: i.Neighborhood,
      PoliceDistrict: i.PoliceDistrict,
      description: i.description,
      priority: i.priority,
      location: i.location,
      ZIPCode: i.ZIPCode,
    }));

    const len = priorities.map(priority => ({
      name: priority,
      total: callData.filter(i => i.priority === priority).length,
      color: theme.colors[priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : priority === 'Low' ? 'blue' : 'green'][500],
      icon: priority === 'High' ? FaExclamationCircle : priority === 'Medium' ? FaExclamationTriangle : priority === 'Low' ? FaInfoCircle : FaRegSmile
    }));

    const totalCall = len.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);

    const yearCountsByPriority = getYearCountsByPriority(tableData, priorities);

    const graphData = prepareGraphData(yearCountsByPriority);

    const cachedData={ totalCall, len, tableData, graphData };
    return cachedData
  }, [callData, theme]);
};

export default useCache;
