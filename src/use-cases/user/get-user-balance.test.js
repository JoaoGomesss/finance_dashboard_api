import { UserNotFoundError } from '../../errors/user'
import { GetUserBalanceUseCase } from './get-user-balance'
import { faker } from '@faker-js/faker'
import { user, userBalance } from '../../tests'

describe('GetUserBalanceUseCase', () => {
    class GetUserBalanceRepositoryStub {
        async execute() {
            return userBalance
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const getUserBalanceRepository = new GetUserBalanceRepositoryStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()
        const sut = new GetUserBalanceUseCase(
            getUserBalanceRepository,
            getUserByIdRepository,
        )

        return { sut, getUserBalanceRepository, getUserByIdRepository }
    }

    it('should get user balance sucessfully', async () => {
        const { sut } = makeSut()
        const userId = faker.string.uuid()

        const result = await sut.execute(userId)

        expect(result).toEqual(userBalance)
    })

    it('should throw UserNotFoundError if GetUserByIdRepository returns null', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdRepository, 'execute')
            .mockResolvedValue(null)

        const userId = faker.string.uuid()

        const promise = sut.execute(userId)

        await expect(promise).rejects.toThrow(new UserNotFoundError(userId))
    })

    it('should call GetUserByIdRepository with correct params', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getUserByIdRepository,
            'execute',
        )

        const userId = faker.string.uuid()

        await sut.execute(userId)

        expect(executeSpy).toHaveBeenCalledWith(userId)
    })

    it('should call GetUserBalanceRepository with correct params', async () => {
        const { sut, getUserBalanceRepository } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getUserBalanceRepository,
            'execute',
        )

        const userId = faker.string.uuid()

        await sut.execute(userId)

        expect(executeSpy).toHaveBeenCalledWith(userId)
    })

    it('should throw if GetUserByIdRepository throws', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const userId = faker.string.uuid()

        const promise = sut.execute(userId)

        await expect(promise).rejects.toThrow()
    })

    it('should throw if GetUserBalanceRepository throws', async () => {
        const { sut, getUserBalanceRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserBalanceRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const userId = faker.string.uuid()

        const promise = sut.execute(userId)

        await expect(promise).rejects.toThrow()
    })
})
