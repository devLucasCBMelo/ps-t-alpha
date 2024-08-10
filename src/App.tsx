import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import RegisterUser from './pages/Register/Register'

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/register" element={ <RegisterUser /> } />
    </Routes>
  )
}

export default App
