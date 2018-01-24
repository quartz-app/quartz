import { all } from 'redux-saga/effects'
import overviewSaga from './overview'
import playerStatsSaga from './playerStats'
import teamStatsSaga from './teamStats'
import matchesModelsSaga from './models'
import trendsSaga from './trends'

export default function* gameDetailsSaga() {
  yield all([
    overviewSaga(),
    teamStatsSaga(),
    playerStatsSaga(),
    matchesModelsSaga(),
    trendsSaga()
  ])
}