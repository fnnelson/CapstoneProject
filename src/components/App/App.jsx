import { useEffect, useState } from 'react'
import './App.css'
import Projects from '../Projects/Projects'

function App() {
  const [count, setCount] = useState(0)
  const urlBase = 'http://localhost:3000'

  return (
    <>
      <h1>Project Management App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Projects urlBase={urlBase} />
    </>
  )
}

export default App
