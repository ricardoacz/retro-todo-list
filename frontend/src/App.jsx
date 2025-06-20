import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'

import LayoutComponent from './components/LayoutComponent'
import NotFoundPage from './components/NotFoundPage'

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutComponent />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
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
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
