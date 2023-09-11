import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './feature/teams'
import Leaderboard from './feature/leaderboard'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/leaderboard" element={ <Leaderboard /> }  />
    </Routes>
  )
}

export default AppRouter