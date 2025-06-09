import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import HomePage from './pages/homePage'
import Login from './pages/login'
import Register from './pages/register'
import Settings from './pages/Settings'

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/settings',
      element: <Settings />
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
