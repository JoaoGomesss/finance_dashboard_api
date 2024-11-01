import { CreateUserController } from './create-user'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    it('should return 201 when creating a user successfully', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Joao',
                last_name: 'Gomes',
                email: 'jg@gmail.com',
                password: '13465878',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(201)
        expect(result.body).toBe(httpRequest.body)
    })

    it('should return 400 if first_name is not provided', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                last_name: 'Gomes',
                email: 'jg@gmail.com',
                password: '13465878',
            },
        }
        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if last_name is not provided', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Gomes',
                email: 'jg@gmail.com',
                password: '13465878',
            },
        }
        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not provided', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Jonh',
                last_name: 'Doe',
                password: '1233546423',
            },
        }
        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not valid', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Jonh',
                last_name: 'Doe',
                email: 'jowgomes.com',
                password: '1233546423',
            },
        }
        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if password is not provided', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Hanna',
                last_name: 'Lisa',
                email: 'hannafo@gmail.com',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if the password does not have at least 6 characters', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Hanna',
                last_name: 'Lisa',
                email: 'hannafo@gmail.com',
                password: '1235',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })
})
