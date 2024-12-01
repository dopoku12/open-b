import { CallService } from "./Gettypes";

//assigns type to data 
export function isCallService(data:any): data is CallService{
  return Array.isArray(data)&& data.every(item=>'priority' in item)
  }

