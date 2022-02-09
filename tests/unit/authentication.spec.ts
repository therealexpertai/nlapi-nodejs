import {Authentication} from "../../src/authentication";

describe('authentication', () => {
    let authentication: Authentication
    const expiredAccessToken = "_.eyJleHAiOjE2NDI0OTMyMjZ9._"
    const invalidAccessToken = "someString"

    beforeEach(() => {
        authentication = new Authentication()
    })

    describe('is token expire', () => {

        test('should token be expire', () => {
            authentication["_accessToken"] = expiredAccessToken
            expect(authentication.isTokenExpired()).toBeTruthy()
        })

        test('shouldn`t token be expire', () => {
            const expireTime = Date.now() + 3600
            const payload = `{"exp":${expireTime}}`
            const encodeToken = Buffer.from(payload, 'binary').toString('base64')

            authentication["_accessToken"] = `_.${encodeToken}._`
            expect(authentication.isTokenExpired()).toBeFalsy()
        })

        test('shouldn`t have token', () => {
            authentication["_accessToken"] = undefined

            expect(authentication.isTokenExpired()).toBeFalsy()
        })

        test('shouldn`t token be valid', () => {
            authentication["_accessToken"] = invalidAccessToken

            expect(() => {
                authentication.isTokenExpired()
            }).toThrow(new Error("Invalid type of token"))
        })
    })
})
