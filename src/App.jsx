import { useState } from 'react'

import './App.css'
import { Header } from './ui/components/Header'
import { Footer } from './ui/components/Footer'
import { NavBar } from './ui/components/NavBar'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <NavBar />
      <AppRoutes />

      {/* contenedor principal */}
      <Footer />

    </>
  )
}

export default App
