import { UserNotFoundError } from '../../errors/user'
import { GetTransactionByUserIdUseCase } from './get-transactions-by-user-id'
import { faker } from '@faker-js/faker'
import { user } from '../../tests'

describe('GetTransactionByUserId', () => {
    class GetTransactionsByUserIdRepositoryStub {
        async execute() {
            return []
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const getTransactionsByUserIdRepository =
            new GetTransactionsByUserIdRepositoryStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()
        const sut = new GetTransactionByUserIdUseCase(
            getTransactionsByUserIdRepository,
            getUserByIdRepository,
        )

        return { sut, getTransactionsByUserIdRepository, getUserByIdRepository }
    }

    it('should get transactions by user id sucessfully ', async () => {
        const { sut } = makeSut()
        const userId = faker.string.uuid()

        const result = await sut.execute(userId)

        expect(result).toEqual([])
    })

    it('should throw UserNotFoundError if user does not exist', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdRepository, 'execute')
            .mockResolvedValueOnce(null)

        const id = faker.string.uuid()

        const promise = sut.execute(id)

        await expect(promise).rejects.toThrow(new UserNotFoundError(id))
    })

    it('should call GetTransactionByUserIdRepository with correct params', async () => {
        const { sut, getTransactionsByUserIdRepository } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getTransactionsByUserIdRepository,
            'execute',
        )

        const id = faker.string.uuid()

        await sut.execute(id)

        expect(executeSpy).toHaveBeenCalledWith(id)
    })
    it('should call GetUserByIdRepository with correct params', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getUserByIdRepository,
            'execute',
        )

        const id = faker.string.uuid()

        await sut.execute(id)

        expect(executeSpy).toHaveBeenCalledWith(id)
    })

    it('should throws if GetUserByIdRepository throws', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())
        const id = faker.string.uuid()
        const promise = sut.execute(id)

        await expect(promise).rejects.toThrow()
    })
    it('should throws if GetTransactionByUserIdRepository throws', async () => {
        const { sut, getTransactionsByUserIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getTransactionsByUserIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())
        const id = faker.string.uuid()
        const promise = sut.execute(id)

        await expect(promise).rejects.toThrow()
    })
})
