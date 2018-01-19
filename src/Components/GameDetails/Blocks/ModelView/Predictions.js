import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card } from 'Components/Common'

// CSS
import './ModelView.scss'

class Predictions extends React.Component {
  convertNumber (num) {
    if (num > 0) {
      return (
        <p className="semibold" style={{ color: 'var(--green)' }}>
          (+{num})
        </p>
      )
    }

    return (
      <p className="semibold" style={{ color: 'var(--red)' }}>
        ({num})
      </p>
    )
  }

  render () {
    const { summary, prediction } = this.props
    const teamNamesStyle = { textAlign: 'left', display: 'inline-block' }

    if (!Object.keys(prediction).length) {
      return <div />
    }

    return (
      <Card label="Prediction" styleName="prediction">
        <Row middle='xs' center='xs' styleName="prediction-section">
          <Col xs={4}>
            <p className="semibold label">TEAM</p>
          </Col>

          <Col xs={4}>
            <p className="semibold label">SPREAD</p>
          </Col>

          <Col xs={4}>
            <p className="semibold label">TOTAL</p>
          </Col>
        </Row>

        <Row middle='xs' center='xs' styleName="prediction-section">
          <Col xs={4}>
            <div style={teamNamesStyle}>
              <p className="semibold label">{summary.away.city}</p>
              <p className="semibold">{summary.away.name}</p>
            </div>
          </Col>

          <Col xs={4}>
            <div styleName='spread'>
              <p className="semibold">{prediction.vegas_away_line.spread}</p>
              {
                this.convertNumber(
                  Number(prediction.vegas_away_line.spread) +
                  Number(prediction.home_points - prediction.away_points)
                )
              }
            </div>
          </Col>

          <Col xs={4}>
            <div styleName='spread'>
              <p className="semibold">O{prediction.vegas_away_line.total}</p>
              {
                this.convertNumber(
                  Number(prediction.home_points + prediction.away_points) -
                  Number(prediction.vegas_home_line.total)
                )
              }
            </div>
          </Col>
        </Row>

        <Row middle='xs' center='xs' styleName="prediction-section">
          <Col xs={4}>
            <div style={teamNamesStyle}>
              <p className="semibold label">{summary.home.city}</p>
              <p className="semibold">{summary.home.name}</p>
            </div>
          </Col>

          <Col xs={4}>
            <div styleName='spread'>
              <p className="semibold">{prediction.vegas_home_line.spread}</p>
              {
                this.convertNumber(
                  Number(prediction.vegas_home_line.spread) +
                  Number(prediction.away_points - prediction.home_points)
                )
              }
            </div>
          </Col>

          <Col xs={4}>
            <div styleName='spread'>
              <p className="semibold">U{prediction.vegas_home_line.total}</p>
              {
                this.convertNumber(
                  Number(prediction.vegas_home_line.total) -
                  Number(prediction.home_points + prediction.away_points)
                )
              }
            </div>
          </Col>
        </Row>
      </Card>
    )
  }
}

Predictions.defaultProps = {
  summary: {},
  prediction: {}
}

Predictions.propTypes = {
  summary: PropTypes.object,
  prediction: PropTypes.object
}

const mapStateToProps = ({ nba }) => ({
  summary: nba.gameDetails.overview.summary,
  prediction: nba.gameDetails.models.selectedModel.model.predictions.find(
    prediction => prediction.match_id === nba.gameDetails.overview.summary.id
  )
})

export default connect(
  mapStateToProps
)(Predictions)
