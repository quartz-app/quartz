import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import pathToRegexp from 'path-to-regexp'

// Components
import { IconMenuItem, IconDropdown } from 'Components/Common'
import Notifications from './Notifications'

// Icons
import LeftArrowIcon from 'Assets/Icons/left-arrow.svg'

// CSS
import './Header.scss'

// Assets
import ProfileIcon from 'Assets/Icons/profile.svg'
import AccountSettingsIcon from 'Assets/Icons/settings/a-edit-2.svg'
import SignoutIcon from 'Assets/Icons/settings/input-12.svg'

// Actions
import { logoutUser, fetchNotifications } from 'Actions'

const SECTION_NAMES = {
  '/': 'Dashboard',
  '/games': 'Games',
  '/games/:id/:sectionName': 'Game Details',
  '/teams': 'Teams',
  '/teams/:id/:sectionName': 'Team Details',
  '/settings/:sectionName': 'Settings',
  '/models': 'Models'
}

class Header extends React.Component {
  componentDidMount () {
    this.props.fetchNotifications()
  }

  getCurrentRoute() {
    for (const regexp of Object.keys(SECTION_NAMES)) {
      if (pathToRegexp(regexp).exec(this.props.location.pathname)) {
        return regexp
      }
    }

    return ''
  }

  navigateSettings = () => {
    this.props.history.push({ pathname: '/settings' })
  }

  navigateBack = () => {
    const indexOfId = this.getCurrentRoute().indexOf(':id')
    const parentRoute = this.getCurrentRoute().slice(0, indexOfId - 1)
    this.props.history.push({ pathname: parentRoute })
  }

  shouldRenderBack () {
    return this.getCurrentRoute().includes(':id')
  }

  render () {
    return (
      <div styleName='header'>
        <div styleName='header-content'>
          <div styleName='title'>
            {
              this.shouldRenderBack() && (
                <LeftArrowIcon styleName="back-icon" onClick={this.navigateBack} />
              )
            }
            <h1 className="semibold">{SECTION_NAMES[this.getCurrentRoute()]}</h1>
          </div>

          <ul styleName='header-items'>
            <Notifications />

            <li>
              <IconDropdown
                horizontalReverse
                listStyle={{ minWidth: '200px' }}
                icon={<ProfileIcon style={{ marginTop: '5px' }} />}
              >
                <IconMenuItem
                  icon={<AccountSettingsIcon width={14} height={14} />}
                  onClick={this.navigateSettings}
                >
                  <span>Settings</span>
                </IconMenuItem>

                <IconMenuItem
                  onClick={() => this.props.logoutUser()}
                  icon={<SignoutIcon width={14} height={14} />}
                >
                  Log out
                </IconMenuItem>
              </IconDropdown>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  logoutUser,
  fetchNotifications
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(Header))
