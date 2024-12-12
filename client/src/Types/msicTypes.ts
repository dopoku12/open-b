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
