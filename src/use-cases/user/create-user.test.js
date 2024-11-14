import { faker } from '@faker-js/faker'
import { CreateUserUseCase } from './create-user'

describe('CreateUserUseCase', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return null
        }
    }

    class CreateUserRepositoryStub {
        async execute(user) {
            return user
        }
    }

    class PasswordHasherAdpaterStub {
        execute() {
            return 'hashed_password'
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'generated_id'
        }
    }

    const makeSut = () => {
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub()
        const createUserRepository = new CreateUserRepositoryStub()
        const passwordHasherAdpater = new PasswordHasherAdpaterStub()
        const idGeneratorAdapter = new IdGeneratorAdapterStub()

        const sut = new CreateUserUseCase(
            getUserByEmailRepository,
            createUserRepository,
            passwordHasherAdpater,
            idGeneratorAdapter,
        )

        return {
            sut,
            getUserByEmailRepository,
            createUserRepository,
            passwordHasherAdpater,
            idGeneratorAdapter,
        }
    }

    it('should successfully create a user', async () => {
        const { sut } = makeSut()

        const createdUser = await sut.execute({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 7 }),
        })

        expect(createdUser).toBeTruthy()
    })
})
