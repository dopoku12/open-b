import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';  
import CrimeStats from './pages/CrimeStats'
import MapComponent from './pages/MapComponent'; 
import NotFound from './pages/NotFound'
import CallStats from './pages/CallStats';

import { useGet } from './hooks/useGet';
import useCache from './hooks/useCache';


const App= () =>{
   const url = 'https://openb-serv.azurewebsites.net/api';
  const { data, load } = useGet(url); 
  const { callData,crimeData } = data || {};
console.log(data)
  const cachedData = useCache(callData);

console.log(crimeData)
return (
   <Router> 
    <Routes> 
      <Route path="/" element={<Home load={load} />}> 
      <Route path='/' element={<CallStats data={cachedData}/>} />
      <Route path="/CrimeStats" element={<CrimeStats />} /> 
      <Route path="/Map" element={<MapComponent />} /> 
      <Route path="*" element={<NotFound />} /> 
      </Route>
    </Routes> 
    </Router> 
)}

export default App