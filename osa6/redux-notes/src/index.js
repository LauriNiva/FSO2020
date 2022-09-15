import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import noteService from './services/notes';

import noteReducer, { setNotes } from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

noteService.getAll().then(notes => store.dispatch(setNotes(notes)))

console.log(store.getState())
store.subscribe(() => console.log(store.getState()))

// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'the app state is in redux store',
//     important: true,
//     id: 1
//   }
// })

// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'state changes are made with actions',
//     important: false,
//     id: 2
//   }
// })

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
