import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    constructor(GetUserByEmailRepository, CreateUserRepository) {
        this.GetUserByEmailRepository = GetUserByEmailRepository
        this.CreateUserRepository = CreateUserRepository
    }
    async execute(createUserParams) {
        const userWithProvidedEmail =
            await this.GetUserByEmailRepository.execute(createUserParams.email)

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }

        const userId = uuidv4()

        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        const createdUser = await this.CreateUserRepository.execute(user)

        return createdUser
    }
}
