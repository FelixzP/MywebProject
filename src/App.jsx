import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Queue from './pages/Queue'
import RegisterForm from './pages/Register'
import Login from './pages/Login'
import Detail from './pages/Detail'
import RepairForm from './pages/repairForm'
import AdminDashBoard from './pages/adminDashBoard'
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Register" element={<RegisterForm />}/>
        <Route path="/AdminDashBoard" element={<AdminDashBoard />}/>
        <Route path="/repairForm" element={<RepairForm />}/>
        <Route path="/detail" element={<Detail />}/>
        <Route path="/" element={<Queue />} />
      </Routes>
    </Router>
  );
};

export default App
