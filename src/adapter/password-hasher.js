import bcrypt from 'bcrypt'

export class PasswordHasherAdpater {
    execute(password) {
        return bcrypt.hash(password, 10)
    }
}
