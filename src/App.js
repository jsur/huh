import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './Landing'
import ReservationDetails from './ReservationDetails'

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/reservationdetails' component={ReservationDetails} />
        </Switch>
      </Router>
    </div>
  )
}

export default App

