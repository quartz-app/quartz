import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// Icons
import ModelIcon from 'Assets/Icons/landingPage/blue-model.svg'
import PodiumIcon from 'Assets/Icons/landingPage/blue-podium-trophy.svg'
import SpaceshipIcon from 'Assets/Icons/landingPage/blue-spaceship.svg'

// CSS
import './HowTo.scss'

const HowTo = () => {
  return (
    <section styleName="how-to">
      <Row center='xs' styleName="col-1000">
        <Col xs={12} style={{ margin: '50px 0', padding: '0 18%' }}>
          <img
            src="https://s3-us-west-1.amazonaws.com/builder-api/data_exports/assets/macbook_pro.jpg"
            style={{
              height: '100%',
              width: '100%',
              marginBottom: '20px'
            }}
          />
        </Col>

        <Col md={4} sm={6} xs={12} styleName="info-1">
          <ModelIcon height={80} width={80} />
          <p>Create models</p>
        </Col>

        <Col md={4} sm={6} xs={12} styleName="info-1">
          <SpaceshipIcon height={80} width={80} />
          <p>Generate predictions</p>
        </Col>

        <Col md={4} xs={12} styleName="info-1">
          <PodiumIcon height={80} width={80} />
          <p>Improve your bets</p>
        </Col>
      </Row>
    </section>
  )
}

export default HowTo
