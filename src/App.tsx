import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import RegisterUser from './pages/Register/Register'
import Products from './pages/Products/Products'
import RegisterProducts from './pages/RegisterProducts/RegisterProducts'

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/register" element={ <RegisterUser /> } />
      <Route path="/products" element={ <Products /> } />
      <Route path="/registerproducts" element={ <RegisterProducts /> } />
    </Routes>
  )
}

export default App
