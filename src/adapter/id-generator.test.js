import validator from 'validator'
import { IdGeneratorAdapter } from './id-generator'

describe('IdGeneratorAdapter', () => {
    it('should return a random id', () => {
        const sut = new IdGeneratorAdapter()

        const result = sut.execute()

        expect(result).toBeTruthy()
        expect(typeof result).toBe('string')
        expect(validator.isUUID(result)).toBe(true)
    })
})
