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
import { CreateProject } from './pages/NewFrorms';

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
        
          <Route element={<LoginPage/>} path='/login'/>
          <Route element={<Projects/>} path='/'/>

          <Route path ="/test" element={<CreateProject/>}/>
         
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
