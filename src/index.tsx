
   
import { Router } from '@reach/router'
import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'

import './index.css'
import App from './App'
import ErrorBoundary from './pages/error/ErrorPage'
import { NotFound } from './pages/notfoundpage/NotFound'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <RecoilRoot>
        <Router>
          <App path="/" />
          <App path="/homepage" />
          <NotFound default />
        </Router>
      </RecoilRoot>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
