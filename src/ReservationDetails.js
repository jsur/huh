import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { getItem } from './localstorage'

class ReservationDetails extends Component {
  render() {
    const professional = getItem('professional')
    console.log('professional:', professional)
    if (!professional || !professional.id) {
      return <Redirect to='/' />
    }
    return (
      <p>ReservationDetails</p>
    )
  }
}

export default ReservationDetails
