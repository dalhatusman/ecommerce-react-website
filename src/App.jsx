import { useState } from 'react'
import { Home } from './pages/Home'
import { Auth } from './pages/Auth'
import { Checkout } from './pages/Checkout'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ProductDetails } from './pages/ProductDetails'
import { Navbar } from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <div className='app'>
          <div className="flex justify-center items-center h-screen bg-blue-500">
        <h1 className="text-4xl text-white font-bold">Hello, Tailwind CSS!</h1>
        </div>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/auth' element={<Auth />} />
            <Route path='/checkout' element={<Checkout />}/>
            <Route path='/products/:id' element={<ProductDetails />}/>
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
