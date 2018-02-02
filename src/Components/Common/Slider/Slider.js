import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

// CSS
import './Slider.scss'

class Slider extends React.Component {
  state = {
    // current value of slider
    value: this.props.value,
    // keeps state of valid values given in input
    validValue: this.props.value,
    inputValue: this.props.value,
    sliderWidth: { width: '100%' },
    showValue: false,
    valuePos: 0
  }

  componentWillMount() {
    const { showInputControl, max } = this.props
    // find max width of input value if showInputControl is set to true
    // use to recalculate width of slider
    if (showInputControl) {
      // max width of input
      const maxInputWidth = `${max.toString().length + 0.5}em`
      this.setState({
        sliderWidth: { width: `calc(100% - ${maxInputWidth} )` }
      })
    }
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    const { value, max, disabled } = this.props
    if (!disabled) this.offsetFill(this.state.value, max)
    this.setState({ inputWidth: this.findInputWidth(value) })
    /* eslint-enable react/no-did-mount-set-state */
  }

  componentWillReceiveProps(newProps) {
    // changes fill width and input width when dragging slider
    if (newProps.value !== this.props.value) {
      this.setState({
        value: newProps.value,
        inputValue: newProps.value,
        inputWidth: this.findInputWidth(newProps.value)
      }, () => {
        if (!this.props.disabled) this.offsetFill(this.state.value, newProps.max)
      })
    }
  }

  onFocus = (e) => {
    e.target.select()
  }

  setValuePos = () => {
    this.offsetValuePos()
    this.setState({
      showValue: true
    })
  }

  handleChange = (e) => {
    const { min, max, onChange } = this.props
    // changes fill event and inputWidth when typed in input
    if (e.target.value < min || !e.target.value.length) {
      this.setState({
        value: min,
        inputValue: min,
        inputWidth: this.findInputWidth(min)
      }, () => {
        this.offsetFill(this.state.value, max)
      })
    } else if (e.target.value > max) {
      this.setState({
        value: max,
        inputValue: e.target.value,
        inputWidth: this.findInputWidth(max)
      }, () => {
        this.offsetFill(this.state.value, max)
      })
    } else {
      this.setState({
        value: Number(e.target.value).toFixed(0),
        inputValue: Number(e.target.value).toFixed(0),
        validValue: Number(e.target.value).toFixed(0),
        inputWidth: this.findInputWidth(Number(e.target.value).toFixed(0))
      }, () => {
        if (onChange) {
          onChange(this.state.value)
        }
        this.offsetFill(this.state.value, max)
      })
    }
  }

  findInputWidth = (value) => {
    if (this.props.showInputControl) {
      // Values outside of the range will read as number and return an undefined length
      if (value.toString().length > 2) return `${value.toString().length}em`
      return '40px'
    }
    return null;
  }

  resetInputValue = () => {
    const { max } = this.props

    if (this.state.inputValue > max) {
      this.setState({
        inputValue: max,
        value: max
      }, () => {
        this.offsetFill(this.state.value, max)
      })
    }
  }

  offsetFill = (currentValue, maxValue) => {
    let percentageValue = currentValue / maxValue
    const width = this.slider.offsetWidth
    let thumbPosition = percentageValue * width
    if (percentageValue > 0.95) {
      percentageValue -= 0.005
      thumbPosition = percentageValue * width
      this.fill.style.width = `${thumbPosition}px`
    } else if (percentageValue < 0.1) {
      percentageValue += 0.005
      thumbPosition = percentageValue * width
      this.fill.style.width = `${thumbPosition}px`
    } else {
      this.fill.style.width = `${thumbPosition}px`
    }

    this.offsetValuePos()
  }

  offsetValuePos = () => {
    const percentage = this.state.value / this.props.max
    const { width: labelRefWidth } = this.labelRef.getBoundingClientRect()
    const thumbOffset = 9 - (labelRefWidth / 2)
    const sliderMaxWidth = this.slider.offsetWidth
    const randomMultiplier = (percentage * 2) + 1
    const thumbPosition = ((sliderMaxWidth * percentage) - (18 * percentage)) + thumbOffset
    if (this.props.showInputControl) {
      this.setState({ valuePos: thumbPosition + randomMultiplier })
    } else {
      this.setState({ valuePos: thumbPosition + randomMultiplier })
    }
  }

  render () {
    const { showInputControl, onChange, disabled, value, style, ...props } = this.props
    const sliderStyle = classNames('slider', {
      disabled
    })
    const valueLabel = classNames('valueLabel', {
      show: this.state.showValue
    })

    return (
      <div style={style}>
        <div styleName="slider-wrapper">
          <label
            ref={ref => this.labelRef = ref}
            className="label"
            styleName={valueLabel}
            style={{ left: `${this.state.valuePos}px` }}
          >
            {this.state.value}
          </label>
          <div styleName="fill" ref={ref => this.fill = ref} />
          <input
            type="range"
            value={this.state.value}
            ref={input => this.slider = input}
            styleName={sliderStyle}
            style={this.state.sliderWidth}
            onChange={onChange}
            disabled={disabled}
            onFocus={this.setValuePos}
            data-thumb={this.state.value.toString()}
            onBlur={() => this.setState({ showValue: false })}
            {...props}
          />
          {
            showInputControl &&
            <div styleName="input-wrapper">
              <input
                type="number"
                value={this.state.inputValue}
                styleName="control-input"
                style={{ width: this.state.inputWidth }}
                onChange={this.handleChange}
                onBlur={this.resetInputValue}
                onFocus={this.onFocus}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

Slider.defaultProps = {
  disabled: false,
  onChange: () => null,
  showInputControl: false,
  style: {},
}

Slider.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  showInputControl: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  style: PropTypes.object
}

export default Slider
