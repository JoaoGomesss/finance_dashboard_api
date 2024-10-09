import { DeleteUserCase } from '../use-cases/index.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFound,
    ok,
    serverError,
} from './helpers'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const deleteUserByIdUseCase = await new DeleteUserCase()

            const deletedUser = await deleteUserByIdUseCase.execute(userId)

            if (!deletedUser) {
                return notFound({
                    message: 'User not found',
                })
            }

            return ok(deletedUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
