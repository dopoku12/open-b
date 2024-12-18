import CrimeDataTable from "../components/CrimeDataTable";
import MapComponent from "../components/MapComponent";
type Props = {
  cachedCrimeData: {
    tableData: { [key: string]: any }[];
  };
};


const CrimeStats = ({cachedCrimeData}: Props) => {
  const {tableData } = cachedCrimeData || {};
  return (
    <div>
    <CrimeDataTable tableData={tableData} title="Crime Data"/>
    <MapComponent tableData={tableData}/>
    </div>
  );
};

export default CrimeStats;
