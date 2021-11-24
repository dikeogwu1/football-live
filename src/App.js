import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import pages
import LandingPage from './Pages/LandingPage'
import Live from './Pages/Live'
import Days from './Pages/Days'
import Info from './Pages/Info'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* landing page */}
        <Route exact path='/' element={<LandingPage />} />

        {/* live page */}
        <Route path='/live' element={<Live />} />

        {/* days page */}
        <Route path='/days/:id' element={<Days />} />
        {/* info page */}
        <Route path='/info/:id' element={<Info />} />
      </Routes>
    </Router>
  )
}

export default App
