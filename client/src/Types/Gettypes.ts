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
