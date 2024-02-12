import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Projects from "../Projects/Projects";
import OneProject from "../Projects/OneProject";
import LoginPage from "../Login/LoginPage";
import "./App.css";
import EmployeeTasks from "../Projects/EmployeeTasks";

const img1 =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3bb52058-0095-4587-b4c5-8b5c9685bc8c/dg0nurt-5c69b963-05b0-4bb7-8082-94060adcd0ff.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNiYjUyMDU4LTAwOTUtNDU4Ny1iNGM1LThiNWM5Njg1YmM4Y1wvZGcwbnVydC01YzY5Yjk2My0wNWIwLTRiYjctODA4Mi05NDA2MGFkY2QwZmYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Z3dRf8arsjmaWgNYEFNXDK4rsbOQZ0ocBBlzDDMJZms";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "10px",
        background: "linear-gradient(to left, gold, orange)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={img1} alt="Poke Mon Go Logo 1" width="50" height="50" />
        <h1
          style={{
            display: "inline-block",
            marginLeft: "10px",
            textShadow: "1px 1px 2px darkred, 0 0 1em red, 0 0 0.2em red",
          }}
        >
          Poke Mon Go Enterprises
        </h1>
      </div>
      <h2>Task Manager</h2>
      <Router>
        <Routes>
          <Route path="/" element={<LoginOrRedirect user={user} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/projects"
            element={
              user.user_id ? (
                user.role === "manager" ? (
                  <Projects />
                ) : (
                  <Navigate to="/employeetasks" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/viewproject"
            element={user.user_id ? <OneProject /> : <Navigate to="/login" />}
          />
          <Route
            path="/employeetasks"
            element={
              user.user_id ? <EmployeeTasks /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

// if manager will be redirected to the Projects Page, otherwise reg employees will go to EmployeeTasks
// if not logged in, user will be brought to LoginPage

function LoginOrRedirect({ user }) {
  return user.user_id ? (
    user.role === "manager" ? (
      <Projects />
    ) : (
      <EmployeeTasks />
    )
  ) : (
    <LoginPage />
  );
}

export default App;
