import { CrimeData } from '../Types/Gettypes';

// Function to convert milliseconds to local date string
const convertToLocalTime = (milliseconds: number) => {
  const date = new Date(milliseconds);
  return date.toLocaleString(); 
};

// Function to remove null values from an object
const removeNullValues = (record: { [key: string]: any }) => {
  const cleanedRecord: { [key: string]: any } = {};
  Object.keys(record).forEach((key) => {
    if (record[key] !== null) {
      cleanedRecord[key] = record[key];
    }
  });
  return cleanedRecord;
};

export default function memoizeCrime(data: CrimeData) {
const tableData = data.map((i) => ({
    CrimeDateTime: convertToLocalTime(i.CrimeDateTime), 
    Age: i.Age,
    CCNumber: i.CCNumber,
    CrimeCode: i.CrimeCode,
    Description: i.Description,
    Gender: i.Gender,
    Latitude: i.Latitude,
    Longitude: i.Longitude,
    Location: i.Location,
    Neighborhood: i.Neighborhood,
    Old_District: i.Old_District,
    PremiseType: i.PremiseType,
    Race: i.Race,
  })).map(removeNullValues); // Remove null values from each record




return { tableData };
}
