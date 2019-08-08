import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import PageWrapper from './PageWrapper'

import { getItem } from './localstorage'
import { inputGray, buttonYellow, button } from './common-styles'

class ReservationDetails extends Component {
  render() {
    const inputs = getItem('inputs')
    if (!inputs || !inputs.professional.id) {
      return <Redirect to='/' />
    }
    const { date, time, place, serviceDesc, professional: { name, title } } = inputs
    return (
      <PageWrapper>
        <h1>Varauksen tiedot</h1>
        <div style={styles.row}>
          <p>Pvm:</p>
          <p>{date}</p>
        </div>
        <div style={styles.row}>
          <p>Aika:</p>
          <p>{time}</p>
        </div>
        <div style={styles.row}>
          <p>Osoite:</p>
          <p>{place}</p>
        </div>
        <div style={styles.row}>
          <p>Palvelu:</p>
          <p>{`${serviceDesc} (${name}, ${title})`}</p>
        </div>
        <div style={styles.buttonWrapper}>
          <button
            style={{ ...button, backgroundColor: inputGray }}
            onClick={() => this.props.history.goBack()}
          >Takaisin</button>
          <button style={{ ...button, backgroundColor: buttonYellow }}>Maksa</button>
        </div>
      </PageWrapper>
    )
  }
}

const styles = {
  row: {
    display: 'flex',
    margin: '0'
  },
  buttonWrapper: {
    display: 'flex',
    width: '80%',
    margin: '0 auto',
    justifyContent: 'space-around'
  }
}

export default ReservationDetails
