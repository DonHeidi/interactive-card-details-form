'use strict'

import './styles/index.scss'

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import Layout from './components/CardDetailsForm/index'

function App() {
  return (
    <StrictMode>
      <Layout />
    </StrictMode>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)
