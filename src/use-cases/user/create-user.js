import { v4 as uuidv4 } from 'uuid'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(
        GetUserByEmailRepository,
        CreateUserRepository,
        passwordHasherAdpater,
    ) {
        this.GetUserByEmailRepository = GetUserByEmailRepository
        this.CreateUserRepository = CreateUserRepository
        this.passwordHasherAdpater = passwordHasherAdpater
    }
    async execute(createUserParams) {
        const userWithProvidedEmail =
            await this.GetUserByEmailRepository.execute(createUserParams.email)

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }

        const userId = uuidv4()

        const hashedPassword = await this.passwordHasherAdpater.execute(
            createUserParams.password,
        )

        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        const createdUser = await this.CreateUserRepository.execute(user)

        return createdUser
    }
}
