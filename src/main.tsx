import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { createStore, applyMiddleware } from 'redux'
import reducer from './redux/Reducer.js'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

const store=createStore(reducer, applyMiddleware(thunk))
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
