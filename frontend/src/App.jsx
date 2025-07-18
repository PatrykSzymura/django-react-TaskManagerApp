import './App.css';
import { useEffect, useState } from "react";
import Projects from'./pages/Projects'
import Header from './components/Header';
import PrivateRoutes from './utils/PrivateRoutes'
import { LoginPage , RegisPage} from "./pages/LogReg";
import Overview from "./pages/Overview"
import Tasks from "./pages/Tasks.jsx"
import Home from "./pages/Home.jsx"

import TeamForm, {CreateTeam2} from "./pages/forms/TeamForm.jsx";
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
import ProjectDetail from './pages/ProjectDetail';
import EditProjectForm from './pages/forms/EditProjectForm';
import AddTaskForm from './pages/forms/AddTaskForm.jsx';
import PasswordChangeForm from './pages/forms/PasswordChangeForm.jsx';
import { getIq } from './utils/dataFeches.js';
import refreshToken from './utils/refreshToken.jsx';
import EditTaskForm from './pages/forms/EditTaskForm.jsx';


function App() {
  const [accesLvl, setAccessLvl] = useState(4);

  useEffect(() => {
    const fetchAccessLevel = async () => {
      if (localStorage['jwtToken']) {
        try {
          const token = localStorage['jwtToken'];
          const decodedToken = await getGroupsFromToken(token);
          setAccessLvl(decodedToken.accessLvl); // Assuming the decoded token has an accessLvl field
        } catch (error) {
          console.error("Failed to fetch access level:", error);
          // Handle error, maybe set accessLvl to a default value
          setAccessLvl(4);
        }
      }
    };

    fetchAccessLevel();
  }, []);

  return (
    <div className="App place-content-center">
      <Router>
        <Header/>
        <Routes>
        {/*Public accces*/}
        {(typeof localStorage['jwtToken'] != "undefined") ? <Route element={<Projects/>} path='/'/> : <Route path='/' element={<Overview/>}/>  }
        <Route element={<Home/>} path='/Home'/>
        <Route element={<LoginPage/>} path='/login'/>
        <Route element={<EditTaskForm/>} path='/test'/>

        {/*Restricted accces*/}
          <Route element={<PrivateRoutes/>}>
            
            
            <Route path='/projects/:project_id' element={<ProjectDetail/>}/>
            { 
            (accesLvl < 4) ? <>

            </> : <>
              <Route path ="/tasks" element={<Tasks/>}/>
              <Route path ="/users" element={<Users/>}/>
              <Route path ="/team" element={<TeamForm/>}/>
            </>
          }

            <Route path="/projects/:project_id/edit" element={<EditProjectForm/>} />
          </Route>
         <Route path='*' element={<Navigate to = '/'/>}/>
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
