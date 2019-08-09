import * as React from 'react'
import SlidingPane from 'react-sliding-pane'
import Modal from 'react-modal'

import PageWrapper from './PageWrapper'
import ProfessionalCard from './ProfessionalCard'
import Button from './Button'

import { getItem, setItem } from './localstorage'
import { input, mainFont } from './common-styles'

class Landing extends React.Component {
  gAutoCompleteInterval = null

  state = {
    service: 'default',
    serviceDesc: '',
    date: '',
    time: '',
    place: '',
    professionalListVisible: false,
    professionals: [
      {
        id: '1',
        name: 'Tomi Aarnio',
        title: 'ART-terapeutti / Urheiluhieroja',
        imageUrl: 'https://www.helsinginurheiluhieronta.fi/wp-content/uploads/2017/05/Tomi-Aarnio_HUH-221x300.jpg'
      },
      {
        id: '2',
        name: 'Viljami Viinikainen',
        title: 'Urheiluhieroja',
        imageUrl: 'https://www.helsinginurheiluhieronta.fi/wp-content/uploads/2017/05/Viljami-Viinikainen_HUH-221x300.jpg'
      },
      {
        id: '3',
        name: 'Anssi Ulvinen',
        title: 'Osteopaatti / Jalkaterapeutti',
        imageUrl: 'https://www.helsinginurheiluhieronta.fi/wp-content/uploads/2017/05/Anssi-Ulvinen_HUH-221x300.jpg'
      },
      {
        id: '4',
        name: 'Ilona Laaksonen',
        title: 'Urheiluhieroja',
        imageUrl: 'https://www.helsinginurheiluhieronta.fi/wp-content/uploads/2017/05/Ilona-Laaksonen_HUH-221x300.jpg'
      },
      {
        id: '5',
        name: 'Mia Lindholm',
        title: 'Osteopaatti / Urheiluhieroja',
        imageUrl: 'https://www.helsinginurheiluhieronta.fi/wp-content/uploads/2017/05/Mia-Lindholm_HUH-221x300.jpg'
      }
    ]
  }

  componentDidMount () {
    this.gAutoCompleteInterval = setInterval(() => {
      if (window.google) {
        this.initGoogleAutoComplete()
      }
    }, 50)
    Modal.setAppElement(this.el)
    const inputs = getItem('inputs')
    if (inputs) {
      const { service, serviceDesc, date, time } = inputs
      this.setState({ service, serviceDesc, date, time })
    }
  }

  initGoogleAutoComplete = () => {
    clearInterval(this.gAutoCompleteInterval)
    const autocomplete = new window.google.maps.places.Autocomplete(document.querySelector('#g-autocomplete'))
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      this.setState({ place: place.formatted_address })
    })
  }

  onCardClick = ({ id = '' }) => {
    const { service, serviceDesc, date, time, place } = this.state
    setItem('inputs', {
      professional: {
        ...this.state.professionals.find(p => p.id === id)
      },
      service,
      serviceDesc,
      date,
      time,
      place
    })
    this.props.history.push('/reservationdetails')
  }

  setService = (evt) => {
    const { target } = evt.nativeEvent
    const idx = target.selectedIndex
    this.setState({ service: evt.target.value, serviceDesc: target[idx].text })
  }

  setDate = (evt) => {
    this.setState({ date: evt.target.value })
  }

  setTime = (evt) => {
    this.setState({ time: evt.target.value })
  }

  formIsValid = () => {
    const { service, serviceDesc, date, time, place } = this.state
    return service && serviceDesc && date && time && place
  }

  openList = () => {
    if (this.formIsValid()) {
      this.setState({ professionalListVisible: true })
    }
  }
 
  render() {
    const { date, time, service, professionalListVisible, professionals } = this.state
    return (
      <PageWrapper>
        <div ref={ref => this.el = ref} style={styles.main}>
          <select style={{ ...mainFont, ...input }} value={service} onChange={this.setService} >
            <option disabled value='default'>Valitse palvelu</option>
            <option value='1'>Urheiluhieronta 30min</option>
            <option value='2'>Urheiluhieronta 45min</option>
          </select>
          <input style={{ ...mainFont, ...input }} type='date' value={date} onChange={this.setDate} placeholder='Pvm' />
          <input style={{ ...mainFont, ...input }} type='time' value={time} onChange={this.setTime} placeholder='Aika' />
          <input style={{ ...input, ...mainFont }} id='g-autocomplete' type='text' placeholder='Syötä osoite' />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2.5%' }}>
            <Button text='Hae' disabled={!this.formIsValid()} onClick={this.openList} />
          </div>
          <SlidingPane
            isOpen={professionalListVisible}
            from='bottom'
            onRequestClose={() => this.setState({ professionalListVisible: false })}
            width='95%'
          >
            {
              professionals.map((p, i) => {
                return (
                  <ProfessionalCard key={p.id} onClick={() => this.onCardClick({ id: p.id })} imageUrl={p.imageUrl} name={p.name} title={p.title} />
                )
              })
            }
          </SlidingPane>
        </div>
      </PageWrapper>
    )
  }
}

const styles = {
  main: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    paddingTop: '15%'
  }
}

export default Landing
