import React from 'react'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

// Global CSS
import './Assets/Stylesheets/Main.scss'

// Layouts
import MainLayout from 'Layouts/Main'
import AuthLayout from 'Layouts/Auth'

// Components
import AuthorizedRoute from 'Components/AuthorizedRoute'
import UnauthorizedRoute from 'Components/UnauthorizedRoute'

// Actions
import { fetchUser } from 'Actions'

// const PrimaryLayout = Loadable({
//   loader: () => import('./layouts/Primary'),
//   loading: Loader
// })
//
// const SessionLayout = Loadable({
//   loader: () => import('./layouts/Session'),
//   loading: Loader
// })

class App extends React.Component {
  componentDidMount () {
    this.props.fetchUser()
  }

  render () {
    return (
      <div className='main'>
        <Switch>
          <UnauthorizedRoute path='/auth' component={AuthLayout} />
          <AuthorizedRoute path='/' component={MainLayout} />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  fetchUser
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(App))
