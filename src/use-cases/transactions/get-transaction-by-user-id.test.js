import { GetTransactionByUserIdUseCase } from './get-transactions-by-user-id'
import { faker } from '@faker-js/faker'

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

    const user = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
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
})
