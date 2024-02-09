import { Routes, Route } from 'react-router-dom';
import Projects from '../Projects/Projects'
import OneProject from '../Projects/OneProject';
import './App.css'

function App() {
  const urlBase = 'http://localhost:3000'
  
  return (
    <>
      <h1>Project Management App</h1>
      <Routes>
        <Route path="/" element={<Projects urlBase={urlBase} />} />
        <Route path="/project" element={<OneProject urlBase={urlBase}/>} />
      </Routes>
    </>
  )
}

export default App
