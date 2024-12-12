import axios from "axios";
import { useEffect,useState } from "react";
import { CallService, CrimeData } from "../Types/Gettypes";

type Response={
    callData:CallService,
    crimeData:CrimeData
}
export const useGet=(url:string)=>{
const [load,setLoad]=useState(true)
const [data,setData]=useState<Response>({callData:[]  ,crimeData:[]})

useEffect(()=>{
    const fetchData=async () => {
    try {
    const req=await axios.get(url)
    if(req.status!==200)
        throw new Error(`promise rejected:${req.status}`);
    const res=await req.data
    res?setData(res):setLoad(false)
    
    } catch (e) {
        console.error(e)
    }
}
fetchData()
},[url])
return {data,load}
}

// export default useGet