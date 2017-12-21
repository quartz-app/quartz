import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Field, reduxForm, reset, initialize } from 'redux-form'

// CSS
import './Login.scss'

// Components
import { Button, Spinner, Checkbox, FieldInput } from 'Components/Common'

// Auth
import { loginUser } from 'Actions'

// Validators
import { presence, minChar, email } from 'Helpers/Validators'

const minChar6 = minChar(6)

class LoginForm extends Component {
  state = {
    isEmailValidated: false,
    rememberMe: false
  }

  toggleRememberMe = () => {
    this.setState({ rememberMe: !this.state.rememberMe })
  }

  handleSubmit = ({ Email, Password }) => {
    const {
      isEmailValidated,
      rememberMe
    } = this.state

    if (isEmailValidated) {
      this.props.loginUser({
        user: {
          email: Email,
          password: Password
        },
        rememberMe
      })
    }

    this.setState({ isEmailValidated: true })

    // initializes reset value of Password to '' and keeps forms pristine
    this.props.dispatch(initialize('login', { Email, Password: '', }, false))
    this.props.dispatch(reset('login'))
  }

  renderError () {
    return (
      <div styleName='error-dialog'>
        <p>Incorrect email address and / or password.</p>
        <p>
          Do you need help <Link className='link' to={{ pathname: '/auth/forgot' }}>logging in?</Link>
        </p>
      </div>
    )
  }

  renderPasswordField () {
    const passwordStyles = {
      height: this.state.isEmailValidated ? 'auto' : '0',
      transition: 'height 300ms',
      transitionDelay: 'height 1s',
      overflow: 'hidden',
      margin: this.state.isEmailValidated ? '15px 0 0' : '0'
    }

    const passwordValidation = []
    // Adds validators to passwordValidation if email is validated
    if (this.state.isEmailValidated) {
      passwordValidation.push(presence, minChar6)
    }

    return (
      <Field
        name='Password'
        type='password'
        label="password"
        isLabelHidden
        component={FieldInput}
        shouldFitContainer
        autoComplete="off"
        spellCheck={false}
        placeholder='Enter password'
        style={passwordStyles}
        validate={passwordValidation}
      />
    )
  }

  renderInnerButton () {
    if (this.props.isLoggingIn) {
      return <Spinner xs show style={{ marginBottom: '3px' }} color="#FFF" />
    }
    return this.state.isEmailValidated ? 'Log in' : 'Continue'
  }

  render () {
    return (
      <div styleName='login-container'>
        <Button
          style={{ textAlign: 'center', margin: 0, fontWeight: '600', position: 'relative' }}
          shouldFitContainer
          secondary
        >
          <i
            className='fa fa-google'
            style={{ fontSize: '14px', position: 'absolute', top: '11px', left: '15px' }}
          />
          Log in with Google
        </Button>

        <p
          style={{
            textAlign: 'center',
            color: '#97A0AF',
            fontSize: '11px',
            marginTop: '20px'
          }}
        >
          OR
        </p>

        {this.props.loginError && this.renderError()}
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Field
            name='Email'
            type='text'
            label="email"
            isLabelHidden
            component={FieldInput}
            shouldFitContainer
            autoComplete="off"
            spellCheck={false}
            placeholder='Enter email'
            validate={[presence, email]}
          />

          {this.renderPasswordField()}

          <Checkbox
            value='rememberMe'
            onChange={this.toggleRememberMe}
            checked={this.state.rememberMe}
            style={{ margin: '15px 0' }}
          >
            Remember me
          </Checkbox>

          <Button shouldFitContainer type="submit">
            {this.renderInnerButton()}
          </Button>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  loginError: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
  isLoggingIn: auth.login.loggingIn,
  loginError: auth.login.error,
})

const mapDispatchToProps = {
  loginUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'login'
})(LoginForm))
