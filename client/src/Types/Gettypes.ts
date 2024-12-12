type ServiceObj = {
Census_Tracts:string;
Community_Statistical_Areas:string;
CouncilDistrict:string;
Neighborhood:string;
PoliceDistrict:string;
PolicePost:string;
SheriffDistricts: string
VRIZones: null;
ZIPCode: string;
callDateTime: number;
callKey: string;
callNumber: string;
description:string;
district:string;
incidentLocation:string;
location: string;
priority: string;
recordId: number;
}
export type CallService=ServiceObj[]

type CrimeDataObj={
Age: string
CCNumber: string
CrimeCode:string
CrimeDateTime: number
Description: string
Ethnicity: string
Gender: string
GeoLocation: string
Inside_Outside: string
Latitude:string 
Location:string
Longitude: string
Neighborhood:string
New_District: string
Old_District: string
Post: string
PremiseType: string
Race: string
RowID: number
Total_Incidents:number
Weapon:string
}

export type CrimeData=CrimeDataObj[]