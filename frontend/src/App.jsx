import './App.css';

import Projects from'./pages/Projects'
import Header from './components/Header';
import PrivateRoutes from './utils/PrivateRoutes'
import { LoginPage , RegisPage} from "./pages/LogReg";
import Overview from "./pages/Overview"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          { sessionStorage.getItem('access_token') == null ? 
          <Route element={<Overview/>} path='/'/> 
          : 
          <Route path='/projects' element={<Projects/>} />
          }
          <Route element={<LoginPage/>} path='/login'/>
          <Route element={<RegisPage/>} path='/register'/>
          

          <Route element={<PrivateRoutes/>}>
          <Route path='/projects' element={<Projects/>} />
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
