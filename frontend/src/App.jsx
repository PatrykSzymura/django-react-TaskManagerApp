import './App.css';
import Projects from './pages/Projects';
import PrivateRoutes from './utils/PrivateRoutes';
import { LoginPage, RegisPage } from './pages/LogReg';
import Header from './components/Header';
import Home from './pages/Home';
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
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route element={<HeaderWrapper />}>
            <Route element={<PrivateRoutes />}>
              <Route path="/projects" element={<Projects />} />
            </Route>
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
