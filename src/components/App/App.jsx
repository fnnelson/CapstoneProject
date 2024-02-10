import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Projects from '../Projects/Projects';
import OneProject from '../Projects/OneProject';
import LoginPage from '../Login/LoginPage';
import './App.css';
import EmployeeTasks from '../Projects/EmployeeTasks';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, []);

  return (
    <>
      <h1>MegaCorp Enterprises <i>Task Manager</i></h1>
      <Router>
        <Routes>
          <Route path="/" element={<LoginOrRedirect user={user} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/projects" element={user.user_id ? (user.role === "manager" ? <Projects /> : <Navigate to="/employeetasks" />) : <Navigate to="/login" />} />
          <Route path="/viewproject" element={user.user_id ? <OneProject /> : <Navigate to="/login" />} />
          <Route path="/employeetasks" element={user.user_id ? <EmployeeTasks /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

function LoginOrRedirect({ user }) {
  return user.user_id ? (user.role === "manager" ? <Projects /> : <EmployeeTasks />) : <LoginPage />;
}

export default App;
