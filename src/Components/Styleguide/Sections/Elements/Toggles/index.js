import React from 'react'
// import PropTypes from 'prop-types'

// Components
import Toggle from 'Components/Common/Toggle'

// CSS
import './Toggles.scss'

class Toggles extends React.Component {
  state = {
    checked1: true,
    checked2: false
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: !this.state[e.target.name] })
  }

  render () {
    return (
      <div styleName="toggles">
        <div styleName="toggle-container">
          <p styleName='label'>{this.state.checked1 ? 'On' : 'Off'}</p>
          <Toggle name="checked1" checked={this.state.checked1} onChange={this.handleChange} />
        </div>
        <div styleName="toggle-container">
          <p styleName='label'>{this.state.checked2 ? 'On' : 'Off'}</p>
          <Toggle name="checked2" checked={this.state.checked2} onChange={this.handleChange} />
        </div>
        <div styleName="toggle-container">
          <p styleName='label'>Disabled Off</p>
          <Toggle disabled onChange={() => null} />
        </div>
      </div>
    )
  }
}

export default Toggles