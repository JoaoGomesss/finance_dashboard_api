import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(
        GetUserByEmailRepository,
        CreateUserRepository,
        passwordHasherAdpater,
        idGeneratorAdapter,
    ) {
        this.GetUserByEmailRepository = GetUserByEmailRepository
        this.CreateUserRepository = CreateUserRepository
        this.passwordHasherAdpater = passwordHasherAdpater
        this.idGeneratorAdapter = idGeneratorAdapter
    }
    async execute(createUserParams) {
        const userWithProvidedEmail =
            await this.GetUserByEmailRepository.execute(createUserParams.email)

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }

        const userId = this.idGeneratorAdapter.execute()

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
