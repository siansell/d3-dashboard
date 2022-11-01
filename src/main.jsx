import React from 'react'
import ReactDOM from 'react-dom/client'

// import Dashboard from "./Dashboard"
import KPIs from "./KPIs"

import './index.css'

// Note that with strict mode enabled in React 18 the useEffect hook runs twice in development.
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <KPIs />
  // </React.StrictMode>
)
