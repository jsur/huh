import React from 'react'

import { inputGray, buttonYellow } from './common-styles'

const Button = ({ text, color = buttonYellow, disabled, onClick }) => {
  return (
    <button
      style={{ ...styles.button, backgroundColor: disabled ? inputGray : color }}
      onClick={onClick}
      disabled={disabled}
    >{text}</button>
  )
}

const styles = {
  button: {
    border: 'none',
    height: '50px',
    fontSize: '1em',
    width: '40%',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: 'bold'
  }
}

export default Button
