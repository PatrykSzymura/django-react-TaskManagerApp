//import React , {useState, useEffect} from "react";
import './App.css';
import Projects from'./pages/Projects'
import PrivateRoutes from './utils/PrivateRoutes'
import { LoginPage , RegisPage} from "./pages/LogReg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
} from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<LoginPage/>} path='/login'/>
          <Route element={<PrivateRoutes/>}>
          <Route path='/projects' element={<Projects/>} />
          </Route>
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
