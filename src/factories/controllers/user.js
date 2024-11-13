import { PasswordHasherAdpater } from '../../adapter/index.js'
import {
    GetUserByIdController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    GetUserBalanceController,
} from '../../controller/index.js'
import {
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgreCreateUserRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserBalanceRepository,
} from '../../repositories/postgres/index.js'
import {
    GetUserByIdUseCase,
    CreateUserUseCase,
    UpdateUseCase,
    DeleteUserCase,
    GetUserBalanceUseCase,
} from '../../use-cases/index.js'

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    return getUserByIdController
}

export const makeCreateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const createUserRepository = new PostgreCreateUserRepository()
    const passwordHasherAdpater = new PasswordHasherAdpater()

    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
        passwordHasherAdpater,
    )

    const createUserController = new CreateUserController(createUserUseCase)

    return createUserController
}

export const makeUpdateUserController = () => {
    const updateUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

    const updateUserUseCase = new UpdateUseCase(
        updateUserByEmailRepository,
        postgresUpdateUserRepository,
    )

    const updateUserController = new UpdateUserController(updateUserUseCase)

    return updateUserController
}

export const makeDeleteUserController = () => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository()

    const deleteUserCase = new DeleteUserCase(postgresDeleteUserRepository)

    const deleteUserController = new DeleteUserController(deleteUserCase)

    return deleteUserController
}

export const makeGetUserBalanceController = () => {
    const postgresGetUserBalanceRepository =
        new PostgresGetUserBalanceRepository()
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserBalanceUseCase = new GetUserBalanceUseCase(
        postgresGetUserBalanceRepository,
        postgresGetUserByIdRepository,
    )

    const getUserBalanceController = new GetUserBalanceController(
        getUserBalanceUseCase,
    )

    return getUserBalanceController
}
