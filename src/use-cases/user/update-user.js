import { EmailAlreadyInUseError } from '../../errors/user.js'

export class UpdateUseCase {
    constructor(
        postgresGetUserByEmailRepository,
        postgresUpdateUserRepository,
        passwordHasherAdpater,
    ) {
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository
        this.postgresUpdateUserRepository = postgresUpdateUserRepository
        this.passwordHasherAdpater = passwordHasherAdpater
    }

    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        const user = {
            ...updateUserParams,
        }

        if (updateUserParams.password) {
            const hashedPassword = await this.passwordHasherAdpater.execute(
                updateUserParams.password,
            )

            user.password = hashedPassword
        }

        const updatedUser = await this.postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
