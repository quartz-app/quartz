import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import Summary from './Summary'
import Quarters from './Quarters'
import GameLeaders from './GameLeaders'
import RecentGames from './RecentGames'
import StartingLineup from './StartingLineup'
import VegasLines from './VegasLines'
import Injuries from './Injuries'

// CSS
import './Overview.scss'

const Overview = ({ match }) => (
  <Row style={{ maxWidth: '1300px', width: '100%' }}>
    <Col xs={12}>
      <Summary />
    </Col>

    <Col xs={12}>
      <Quarters idProp={match.params.id} />
    </Col>

    <Col xs={6}>
      <GameLeaders />
    </Col>

    <Col xs={6}>
      <VegasLines />
    </Col>

    <Col xs={7}>
      <StartingLineup idProp={match.params.id} />
    </Col>

    <Col xs={5}>
      <RecentGames idProp={match.params.id} />
    </Col>

    <Col xs={7}>
      <Injuries idProp={match.params.id} />
    </Col>
  </Row>
)

Overview.propTypes = {
  match: PropTypes.object.isRequired
}

export default Overview
