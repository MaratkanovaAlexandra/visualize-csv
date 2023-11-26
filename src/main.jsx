import React from 'react'
import ReactDOM from 'react-dom/client'

import './i18n'
import { App } from './App.jsx'
import {DataProvider} from '@/hooks'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
)
