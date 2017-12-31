import React from 'react'

// Components
import Account from './Account'
import Billing from './Billing'
import SubHeader from './SubHeader'

// CSS
import './Settings.scss'

const AccountSubText = 'Manage and personalize account settings'
const BillingSubText = 'Choose a payment plan and fill out the payment option and information below'

class Settings extends React.Component {
  render () {
    return (
      <div style={{ overflowY: 'scroll', overflowX: 'hidden', height: '90vh', maxWidth: '1600px' }}>
        <SubHeader text="Account Info" subText={AccountSubText} />
        <Account />

        <SubHeader text="Billing Info" subText={BillingSubText} />
        <Billing />
      </div>
    )
  }
}

export default Settings
