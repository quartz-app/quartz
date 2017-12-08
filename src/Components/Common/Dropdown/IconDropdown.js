import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Dropdown.scss'

class Dropdown extends React.Component {
  state = {
    open: false,
    vertReversed: false,
    horReversed: false
  }

  componentDidMount () {
    const { verticalReverse, horizontalReverse } = this.props
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      vertReversed: verticalReverse ? true : this.shouldVertReverse(),
      horReversed: horizontalReverse ? true : this.shouldHorReverse()
    })
    /* eslint-enable react/no-did-mount-set-state */
  }

  onBlur = () => {
    this.setState({ open: false })
  }

  onListClick = (e) => {
    if (e.target.tagName === 'UL' || e.target.className.includes('disabled')) { return }

    this.setState({ open: false })
  }

  toggleDropdown = () => {
    this.setState({ open: !this.state.open })
  }

  shouldVertReverse () {
    const rect = this.dropdown.getBoundingClientRect()

    return (rect.y + rect.height) >= window.innerHeight
  }

  shouldHorReverse () {
    const rect = this.dropdown.getBoundingClientRect()

    return (rect.x + rect.width) >= window.innerWidth
  }

  reversedStyles () {
    const { vertReversed, horReversed } = this.state
    const styles = {}

    if (vertReversed) {
      styles.top = 'auto'
      styles.bottom = 'calc(100% + 8px)'
    }

    if (horReversed) {
      styles.left = 'auto'
      styles.right = '0'
    }

    return styles
  }

  render () {
    const { icon, children, wrapperStyle } = this.props
    const { open } = this.state

    const dropdownClass = classNames('icon-dropdown', { open })
    const optionsClass = classNames('options', { open })

    return (
      <div
        style={{ ...wrapperStyle, position: 'relative', display: 'inline-block' }}
        onBlur={this.onBlur}
        tabIndex='0'
      >
        <div
          styleName={dropdownClass}
          onClick={this.toggleDropdown}
        >
          <span>{icon}</span>
        </div>

        <ul
          style={this.reversedStyles()}
          styleName={optionsClass}
          onClick={this.onListClick}
          ref={dropdown => this.dropdown = dropdown}
        >
          {children}
        </ul>
      </div>
    )
  }
}

Dropdown.defaultProps = {
  verticalReverse: false,
  horizontalReverse: false,
  wrapperStyle: {}
}

Dropdown.propTypes = {
  icon: PropTypes.element.isRequired,
  verticalReverse: PropTypes.bool,
  horizontalReverse: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired
}

export default Dropdown
