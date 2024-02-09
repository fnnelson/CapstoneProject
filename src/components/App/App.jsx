import { HashRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Projects from '../Projects/Projects'
import OneProject from '../Projects/OneProject';
import './App.css'

function App() {
  const urlBase = 'http://localhost:3000'

  return (
    <Router>
      {/* <h1>Project Management App</h1> */}
      <Switch>
        <Route path="/" element={<Projects urlBase={urlBase} />} />
        <Route path="/project" element={<OneProject urlBase={urlBase} />} />
      </Switch>
    </Router>
  )
}

export default App
