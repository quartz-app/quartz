import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Spinner.scss'

const Spinner = ({ diameter, xs, sm, md, lg, show }) => {
  const spinnerClass = classNames('spinner', {
    xs,
    sm,
    md,
    lg
  })

  const spinnerStyle = {}

  if (diameter) {
    spinnerStyle.height = diameter
    spinnerStyle.width = diameter
    spinnerStyle.lineHeight = diameter
  }


  return (
    <svg
      styleName={spinnerClass}
      style={{
        ...spinnerStyle,
        display: show ? 'inline-block' : 'none',
        verticalAlign: 'middle'
      }}
      viewBox='0 0 66 66'
    >
      <circle
        styleName='path'
        fill='none'
        strokeWidth='6'
        strokeLinecap='round'
        cx='33'
        cy='33'
        r='30'
      />
    </svg>
  )
}

Spinner.defaultProps = {
  show: false,
  xs: false,
  sm: false,
  md: false,
  lg: false,
  diameter: undefined
}

Spinner.propTypes = {
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  diameter: PropTypes.number,
  show: PropTypes.bool
}

export default Spinner
