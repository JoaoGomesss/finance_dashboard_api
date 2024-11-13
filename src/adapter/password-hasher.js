import bcrypt from 'bcrypt'

export class PasswordHasherAdpater {
    async execute(password) {
        await bcrypt.execute(password, 10)
    }
}
