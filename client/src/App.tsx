import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';  
import CrimeStats from './pages/CrimeStats' 
import NotFound from './pages/NotFound'
import CallStats from './pages/CallStats';

import { useGet } from './hooks/useGet';
import memoizeCall from './hooks/memoizeCall';
import memoizeCrime from './hooks/memoizeCrime';


const App= () =>{
   const url = 'https://openb-serv.azurewebsites.net/api';
  const { data, load } = useGet(url); 
  const { callData,crimeData } = data || {};
  const cachedCallData = memoizeCall(callData);
  const cachedCrimeData=memoizeCrime(crimeData)

return (
   <Router> 
    <Routes> 
      <Route path="/" element={<Home load={load} />}> 
      <Route path='/' 
      element={
        <CallStats 
      data={cachedCallData}/>
    } 
      />
      <Route path="/CrimeStats" 
      element={
        <CrimeStats 
       cachedCrimeData={cachedCrimeData} />
      } /> 
      <Route path="*" element={<NotFound />} /> 
      </Route>
    </Routes> 
    </Router> 
)}

export default App