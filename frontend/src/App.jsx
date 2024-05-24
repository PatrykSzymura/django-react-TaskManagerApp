import './App.css';
import { useEffect, useState } from "react";
import Projects from'./pages/Projects'
import Header from './components/Header';
import PrivateRoutes from './utils/PrivateRoutes'
import { LoginPage , RegisPage} from "./pages/LogReg";
import Overview from "./pages/Overview"
import Tasks from "./pages/Tasks.jsx"

import TeamForm, {CreateTeam2} from "./pages/forms/TeamForm.jsx"
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
import ProjectDetail from './pages/ProjectDetail';
import EditProjectForm from './pages/forms/EditProjectForm';
import CreateTask from "./pages/forms/CreateTask";
import AddTaskForm from './pages/forms/AddTaskForm.jsx';
import PasswordChangeForm from './pages/forms/PasswordChangeForm.jsx';

function App() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // or however you store your JWT
    if (token) {
      const userGroups = getGroupsFromToken(token);
      setGroups(userGroups);
    } 
  }, []);

  return (
    <div className="App place-content-center">
      <Router>
        <Header/>
        <Routes>
        
          <Route element={<LoginPage/>} path='/login'/>
          <Route element={<Projects/>} path='/'/>
          <Route path='/projects/:project_id' element={<ProjectDetail/>}/>
          <Route path ="/CreateTeam" element={<CreateTeam/>}/>
          <Route path ="/Projects" element={<Projects/>}/>
          <Route path ="/tasks" element={<Tasks/>}/>
          <Route path ="/Users" element={<Users/>}/>
          <Route path ="/team" element={<TeamForm/>}/>
          <Route path ="/test" element={<PasswordChangeForm/>}/>

          <Route path="/projects/:project_id/edit" element={<EditProjectForm/>} />
          <Route path="/projects/:project_id/CreateTask" element={<CreateTask/>} />
         
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
