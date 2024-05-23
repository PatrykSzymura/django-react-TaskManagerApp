import './App.css';
import { useEffect, useState } from "react";
import Projects from'./pages/Projects'
import Header from './components/Header';
import PrivateRoutes from './utils/PrivateRoutes'
import { LoginPage , RegisPage} from "./pages/LogReg";
import Overview from "./pages/Overview"

import CreateTeam from './pages/CreateTeam';
import Users from './pages/Users';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
} from 'react-router-dom';
import {Tester , UserGroups} from './pages/Test';
import getGroupsFromToken from './utils/axiosInstance';

function App() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // or however you store your JWT
    if (token) {
      const userGroups = getGroupsFromToken(token);
      setGroups(userGroups);
    } 
  }, []);
  console.log(groups)

  return (
    <div className="App place-content-center">
      <Router>
        <Header/>
        <Routes>
        
          { sessionStorage.getItem('access_token') === null ? 
          <Route element={<Overview/>} path='/'/> 
          : 
          <Route path='/projects' element={<Projects/>} />
          }
          <Route element={<LoginPage/>} path='/login'/>
          <Route element={<RegisPage/>} path='/register'/>
          
          <Route path='/test' element={<UserGroups/>} />

          <Route element={<PrivateRoutes/>}>
          <Route path='/projects' element={<Projects/>} />
          <Route path='/Users' element={<Users/>} />

          <Route path='/CreateTeam' element={<CreateTeam/>} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

const HeaderWrapper = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default App;
