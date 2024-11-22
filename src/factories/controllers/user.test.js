import {
    CreateUserController,
    DeleteUserController,
    GetUserBalanceController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controller'
import {
    makeGetUserByIdController,
    makeCreateUserController,
    makeUpdateUserController,
    makeGetUserBalanceController,
    makeDeleteUserController,
} from './user'

describe('UserControllerFactories', () => {
    it('should return a valid GetUserByIdController instace', async () => {
        expect(makeGetUserByIdController()).toBeInstanceOf(
            GetUserByIdController,
        )
    })
    it('should return a valid CreateUserController instace', async () => {
        expect(makeCreateUserController()).toBeInstanceOf(CreateUserController)
    })
    it('should return a valid UpdateUserController instace', async () => {
        expect(makeUpdateUserController()).toBeInstanceOf(UpdateUserController)
    })
    it('should return a valid DeleteUserByIdController instace', async () => {
        expect(makeDeleteUserController()).toBeInstanceOf(DeleteUserController)
    })
    it('should return a valid GetUserBalanceController instace', async () => {
        expect(makeGetUserBalanceController()).toBeInstanceOf(
            GetUserBalanceController,
        )
    })
})
