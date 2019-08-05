import * as React from 'react'
import SlidingPane from 'react-sliding-pane'
import Modal from 'react-modal'

import PageWrapper from './PageWrapper'
import ProfessionalCard from './ProfessionalCard'

import { setItem } from './localstorage'

class Landing extends React.Component {
  gAutoCompleteInterval = null

  state = {
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
  }

  initGoogleAutoComplete = () => {
    clearInterval(this.gAutoCompleteInterval)
    const autocomplete = new window.google.maps.places.Autocomplete(document.querySelector('#g-autocomplete'))
    autocomplete.addListener('place_changed', () => this.setState({ professionalListVisible: true }))
  }

  onCardClick = ({ id = '' }) => {
    setItem('professional', { ...this.state.professionals.find(p => p.id === id) })
    this.props.history.push('/reservationdetails')
  }
 
  render() {
    const { professionalListVisible, professionals } = this.state
    return (
      <PageWrapper>
        <div ref={ref => this.el = ref} style={styles.main}>
          <select style={{ ...styles.mainFont, ...styles.input, paddingLeft: '1%' }} >
            <option disabled selected value>Valitse palvelu</option>
            <option value='1'>Urheiluhieronta 30min</option>
            <option value='2'>Urheiluhieronta 45min</option>
          </select>
          <input style={{ ...styles.mainFont, ...styles.input }} type='datetime-local' />
          { /* <h1 style={styles.header}>Mihin haluat hierojan?</h1> */ }
          <input style={{ ...styles.input, ...styles.mainFont }} id='g-autocomplete' type='text' placeholder='Syötä osoite' />
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '15%'
  },
  mainFont: {
    fontFamily: 'Space Mono'
  },
  header: {
    textAlign: 'center',
    fontSize: '1.25em'
  },
  input: {
    border: 'none',
    backgroundColor: '#f7f7f7',
    height: '2.5em',
    fontSize: '0.85em',
    margin: '2% auto',
    width: '80%',
    paddingLeft: '5%'
  }
}

export default Landing
