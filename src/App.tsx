import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const testIntegration = () => {
      axios.get(apiUrl).then(response => {
        console.log(response)
      })
    }
    testIntegration()
  }, [count])
  

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
