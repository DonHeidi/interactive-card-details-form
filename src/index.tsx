import { createRoot } from 'react-dom/client'
import React from 'react'
import Layout from './components/CardDetailsForm/index'
console.log('Hallo Welt!')

function App() {
  return <Layout />
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)
