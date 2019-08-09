import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import PageWrapper from './PageWrapper'
import Button from './Button'

import { getItem } from './localstorage'
import { inputGray, input, mainFont } from './common-styles'

class ReservationDetails extends Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    additionalInfo: '',
    marketing: false
  }

  renderRow = ({ label, value }) => {
    return (
      <div style={styles.row}>
        <p style={{ ...styles.rowText, fontWeight: 'bold', flex: 1 }}>{label}</p>
        <p style={{ ...styles.rowText, flex: 2}}>{value}</p>
      </div>
    )
  }

  onFormFieldChange = (fieldName, value) => {
    this.setState({ [fieldName]: value })
  }

  formIsValid = () => {
    const { firstName, lastName, phone, email, additionalInfo } = this.state
    return firstName && lastName && phone && email && additionalInfo
  }

  render() {
    const inputs = getItem('inputs')
    if (!inputs || !inputs.professional.id) {
      return <Redirect to='/' />
    }
    const { date, time, place, serviceDesc } = inputs
    const { firstName, lastName, phone, email, additionalInfo, marketing } = this.state
    return (
      <PageWrapper>
        <h2>Varauksen tiedot</h2>
        { this.renderRow({ label: 'Pvm ja aika', value: `${date}, ${time}` }) }
        { this.renderRow({ label: 'Osoite', value: place }) }
        { this.renderRow({ label: 'Palvelu', value: serviceDesc }) }
        <form>
          <input
            style={{ ...input, ...mainFont }}
            value={firstName}
            onChange={evt => this.onFormFieldChange('firstName', evt.target.value)}
            type='text'
            placeholder='Etunimi'
          />
          <input
            style={{ ...input, ...mainFont }}
            value={lastName}
            onChange={evt => this.onFormFieldChange('lastName', evt.target.value)}
            type='text'
            placeholder='Sukunimi'
          />
          <input
            style={{ ...input, ...mainFont }}
            value={phone}
            onChange={evt => this.onFormFieldChange('phone', evt.target.value)}
            type='tel'
            placeholder='Puhelin'
          />
          <input
            style={{ ...input, ...mainFont }}
            value={email}
            onChange={evt => this.onFormFieldChange('email', evt.target.value)}
            type='email'
            placeholder='Sähköposti'
          />
          <input
            style={{ ...input, ...mainFont }}
            value={additionalInfo}
            onChange={evt => this.onFormFieldChange('additionalInfo', evt.target.value)}
            type='text'
            placeholder='Lisätiedot: Rapun numero, ovikoodi..'
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              style={{ ...input, ...mainFont, width: '10%' }}
              value={marketing}
              onChange={evt => this.setState({ marketing: evt.target.checked })}
              type='checkbox'
            /><span style={{ fontSize: '0.7em', marginLeft: '2%' }}>Minulle saa lähettää Helsingin Urheiluhieronnan markkinointia</span>
          </div>
        </form>
        <div style={styles.buttonWrapper}>
          <Button text='Takaisin' color={inputGray} disabled={false} onClick={() => this.props.history.goBack()} />
          <Button text='Maksa' disabled={!this.formIsValid()} onClick={() => window.open('https://www.checkout.fi/', '_blank')} />
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
    margin: '2.5% auto',
    justifyContent: 'space-around'
  },
  rowText: {
    fontSize: '0.8rem',
    margin: '1.5% 0'
  }
}

export default ReservationDetails
