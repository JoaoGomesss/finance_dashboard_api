import { badRequest } from './http.js'

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at least 6 characters',
    })

export const emailIsAlreadyInUse = () =>
    badRequest({
        message: 'Invalid e-mail, please provide a valid one',
    })

export const userNotFoundResponse = () =>
    badRequest({ message: 'User not found.' })
