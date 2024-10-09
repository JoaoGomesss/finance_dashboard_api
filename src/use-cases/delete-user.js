import { PostgresDeleteUserRepository } from '../repositories/postgres/index.js'

export class DeleteUserCase {
    async execute(userId) {
        if (userId) {
            const postgresDeleteUserRepository =
                new PostgresDeleteUserRepository()

            const deleteUser =
                await postgresDeleteUserRepository.execute(userId)

            return deleteUser
        }
    }
}
