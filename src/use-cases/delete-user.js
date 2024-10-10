export class DeleteUserCase {
    constructor(postgresDeleteUserRepository) {
        this.postgresDeleteUserRepository = postgresDeleteUserRepository
    }
    async execute(userId) {
        if (userId) {
            const deleteUser =
                await this.postgresDeleteUserRepository.execute(userId)

            return deleteUser
        }
    }
}
