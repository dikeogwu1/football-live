import React from 'react'
import reactDom from 'react-dom'
import App from './App'
import './index.css'
import Context from './Component/Store/Context'

reactDom.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
)
