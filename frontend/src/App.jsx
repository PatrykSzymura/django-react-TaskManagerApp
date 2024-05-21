import './App.css';
<<<<<<< Updated upstream
import Projects from './pages/Projects';
import PrivateRoutes from './utils/PrivateRoutes';
import { LoginPage, RegisPage } from './pages/LogReg';
import Header from './components/Header';
import Home from './pages/Home';
=======
import Projects from'./pages/Projects'
import Header from './components/Header';
import PrivateRoutes from './utils/PrivateRoutes'
import { LoginPage , RegisPage} from "./pages/LogReg";
import Overview from "./pages/Overview"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    <div className="App">
=======
    <div className="App bg-secondary">
      
>>>>>>> Stashed changes
      <Router>
        <Header/>
        <Routes>
<<<<<<< Updated upstream
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route element={<HeaderWrapper />}>
            <Route element={<PrivateRoutes />}>
              <Route path="/projects" element={<Projects />} />
            </Route>
=======
          { sessionStorage.getItem('access_token') == null ? 
          <Route element={<Overview/>} path='/'/> : null
          }
          <Route element={<LoginPage/>} path='/login'/>
          <Route element={<RegisPage/>} path='/register'/>
          

          <Route element={<PrivateRoutes/>}>
          <Route path='/projects' element={<Projects/>} />
>>>>>>> Stashed changes
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
