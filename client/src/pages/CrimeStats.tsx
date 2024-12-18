import CrimeDataTable from "../components/CrimeDataTable";
import { TableItem } from "../components/TableItem";

import { tableData } from "../Types/msicTypes";
type Props = {
  cachedCrimeData: {
    tableData: { [key: string]: any }[];
  };
};


const CrimeStats = ({cachedCrimeData}: Props) => {
  console.log(cachedCrimeData)
  const {tableData } = cachedCrimeData || {};
  return (
    <div>

    <CrimeDataTable tableData={tableData} title="Crime Data"/>
    </div>
  );
};

export default CrimeStats;
