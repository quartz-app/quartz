import React from 'react'
import PropTypes from 'prop-types'

// Components
import Button from 'Components/Common/Button'

// CSS
import './../Elements.scss'

const Buttons = ({ theme }) => {
  return (
    <div styleName="button-container">
      <p className='bold' styleName="label">{theme.text}</p>
      <br />
      <Button {...theme}>Button Default</Button>
    </div>
  )
}

Buttons.propTypes = {
  theme: PropTypes.object.isRequired
}

export default Buttons