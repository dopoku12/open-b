export type CallData={ 
        totalCall:number,
        len: {
        name: string,
        total: number,
    }[]
    tableData:[],
}

export type GraphData = {
  year: number;
  High: number;
  Medium: number;
  Low: number;
  "Non-Emergency": number;
}[];

export type TableRow = {
  callDateTime: number;
  Neighborhood: string;
  PoliceDistrict: string;
  description: string;
  priority: string;
  location: string;
  ZIPCode: string;
};


export interface CrimeDataRecord {
  Age: string;
  CCNumber: string;
  CrimeCode: string;
  CrimeDateTime: string;
  Description: string;
  Ethnicity: string;
  Gender: string;
  Latitude: string;
  Longitude: string;
  Location: string;
  Neighborhood: string;
  Old_District: string;
  PremiseType: string;
  Race: string;
}


export type tableData = CrimeDataRecord[];
