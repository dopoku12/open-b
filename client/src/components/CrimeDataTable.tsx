import React, { useState } from 'react';

type Props = {
  title: string;
  tableData: { [key: string]: any }[];
  rowLimit?: 10 | 20 | 30 | 40 | 50;
};

// Define the CrimeDataTable component
const CrimeDataTable: React.FC<Props> = ({ tableData, title, rowLimit = 10 }) => {
  // Define the headers based on the object keys
  const headers = tableData.length > 0 ? Object.keys(tableData[0]) : [];
  // Default visible columns
  const defaultVisibleColumns = ['CrimeDateTime', 'Neighborhood', 'Description'];
  // State to manage the selected number of rows to display
  const [rowsToShow, setRowsToShow] = useState<10 | 20 | 30 | 40 | 50>(rowLimit);
  // State to manage visible columns
  const [visibleColumns, setVisibleColumns] = useState<string[]>(defaultVisibleColumns);

  // Limit the number of rows to display
  const limitedData = tableData.slice(0, rowsToShow);

  const handleRowChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsToShow(Number(event.target.value) as 10 | 20 | 30 | 40 | 50);
  };

  const handleColumnChange = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
    );
  };

  return (
    <div>
      <h2>{title}</h2>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="rowLimit">Show rows: </label>
        <select id="rowLimit" value={rowsToShow} onChange={handleRowChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        {headers.map((header) => (
          <label key={header} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={visibleColumns.includes(header)}
              onChange={() => handleColumnChange(header)}
            />
            {header}
          </label>
        ))}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {visibleColumns.map((header) => (
                <th key={header} style={styles.header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {limitedData.map((item, index) => (
              <tr key={index}>
                {visibleColumns.map((header) => (
                  <td key={header} style={styles.cell}>
                    {item[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  header: {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  cell: {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
};

export default CrimeDataTable;
