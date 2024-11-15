import { faker } from '@faker-js/faker'
import { DeleteUserCase } from './delete-user'

describe('DeleteUserUseCase', () => {
    const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
    }

    class DeleteUserRepositoryStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const deleteUserRepository = new DeleteUserRepositoryStub()
        const sut = new DeleteUserCase(deleteUserRepository)

        return { sut, deleteUserRepository }
    }

    const userId = faker.string.uuid()

    it('should delete an user successfully', async () => {
        const { sut } = makeSut()

        const deletedUser = await sut.execute(userId)

        expect(deletedUser).toEqual(user)
    })

    it('should call DeleteUserRepository with correct params', async () => {
        const { sut, deleteUserRepository } = makeSut()
        const executeSpy = jest.spyOn(deleteUserRepository, 'execute')

        await sut.execute(userId)

        expect(executeSpy).toHaveBeenCalledWith(userId)
    })

    it('should throw if DeleteUserRepository throws', async () => {
        const { sut, deleteUserRepository } = makeSut()
        jest.spyOn(deleteUserRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        const promise = sut.execute(userId)

        expect(promise).rejects.toThrow()
    })
})