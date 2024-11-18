import { UserNotFoundError } from '../../errors/user'
import { CreateTransactionUseCase } from './create-transaction'
import { transaction, user } from '../../tests/index.js'

describe('CreateTransactionUseCase', () => {
    class CreateTransactionRepositoryStub {
        async execute() {
            return transaction
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'generated_id'
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }

    const createTransactionParams = {
        ...transaction,
        id: undefined,
    }

    const makeSut = () => {
        const createTransactionRepository =
            new CreateTransactionRepositoryStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()
        const idGeneratorAdapter = new IdGeneratorAdapterStub()
        const sut = new CreateTransactionUseCase(
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        )

        return {
            sut,
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        }
    }
    it('should create a transaction sucessfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(createTransactionParams)

        expect(result).toEqual(transaction)
    })

    it('should call GetUserByIdRepository with correct params', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        const executeSpy = jest.spyOn(getUserByIdRepository, 'execute')

        await sut.execute(createTransactionParams)

        expect(executeSpy).toHaveBeenCalledWith(createTransactionParams.user_id)
    })

    it('should call IdGeneratorAdapter', async () => {
        const { sut, idGeneratorAdapter } = makeSut()
        const executeSpy = jest.spyOn(idGeneratorAdapter, 'execute')

        await sut.execute(createTransactionParams)

        expect(executeSpy).toHaveBeenCalled()
    })

    it('should call CreateTransactionRepository with correct params', async () => {
        const { sut, createTransactionRepository } = makeSut()
        const executeSpy = jest.spyOn(createTransactionRepository, 'execute')

        await sut.execute(createTransactionParams)

        expect(executeSpy).toHaveBeenCalledWith({
            ...createTransactionParams,
            id: 'generated_id',
        })
    })

    it('should throw UserNotFoundError if user does not exist', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValueOnce(null)

        const promise = sut.execute(createTransactionParams)

        await expect(promise).rejects.toThrow(
            new UserNotFoundError(createTransactionParams.user_id),
        )
    })

    it('should throws if CreateTransactionRepository throws', async () => {
        const { sut, createTransactionRepository } = makeSut()
        jest.spyOn(
            createTransactionRepository,
            'execute',
        ).mockRejectedValueOnce(new Error())

        const result = sut.execute(createTransactionParams)

        await expect(result).rejects.toThrow()
    })

    it('should throws if getUserByIdRepository throws', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        const result = sut.execute(createTransactionParams)

        await expect(result).rejects.toThrow()
    })
    it('should throws if idGeneratorAdapter throws', async () => {
        const { sut, idGeneratorAdapter } = makeSut()
        jest.spyOn(idGeneratorAdapter, 'execute').mockImplementationOnce(() => {
            throw new Error()
        })

        const result = sut.execute(createTransactionParams)

        await expect(result).rejects.toThrow()
    })
})
