import { axios } from 'Apis'

export const createUser = (params) => (
  axios.post('/api/v1/users', params)
)

export const updateUser = (userId, params) => (
  axios.put(`/api/v1/users/${userId}`, params)
)

export const sendRecoveryEmail = (email) => (
  axios.post('/api/v1/users/recover', { email })
)

export const validateResetToken = (params) => (
  axios.get('/api/v1/users/validate_reset', { params })
)