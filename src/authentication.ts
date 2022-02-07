import * as process from "process";
import axios from "axios";

export class Authentication {
    private _accessToken: string | undefined

    /**
     * Username from env variable
     *
     * @throws "Missing env variable EAI_USERNAME"
     * @returns {string} Return username
     * @private
     * @memberof Authentication
     */
    private get username(): string {
        if (process.env.EAI_USERNAME) {
            return process.env.EAI_USERNAME
        }

        throw new Error("Missing env variable EAI_USERNAME")
    }

    /**
     * Password from env variable
     *
     * @throws "Missing env variable EAI_PASSWORD"
     * @returns {string} Return user password
     * @private
     * @memberof Authentication
     */
    private get password(): string {
        if (process.env.EAI_PASSWORD) {
            return process.env.EAI_PASSWORD
        }

        throw new Error("Missing env variable EAI_PASSWORD")
    }

    /**
     * Check if generated token is JWT token
     *
     * @throws "Invalid type of token"
     * @returns {boolean} Return true or false if generated token is JWT token
     * @private
     * @memberof Authentication
     */
    private isJWTToken(): boolean {
        const jwtTokenArr = this._accessToken?.split('.')
        return !!(jwtTokenArr && jwtTokenArr.length === 3);
    }

    /**
     * Check if generated token is expired
     *
     * @returns {boolean} Return true or false if generated token is expired
     * @private
     * @memberof Authentication
     */
    public isTokenExpired(): boolean {
        if(!this._accessToken) {
            return false
        }

        if(!this.isJWTToken()) {
            throw new Error("Invalid type of token")
        }

        const payloadBase64 = this._accessToken.split('.')[1]
        const decodedJson = Buffer.from(payloadBase64, 'base64').toString()
        const decoded: {exp: number} = JSON.parse(decodedJson)
        const exp = decoded.exp

        return (Date.now() >= exp * 1000)
    }

    /**
     * Generate token with currect username and password
     *
     * @returns {string} Return generated token
     * @private
     * @memberof Authentication
     */
    private async generateToken(): Promise<string> {
        const data = {
            username: this.username,
            password: this.password
        }

        const res = await axios.post('https://developer.expert.ai/oauth2/token', data)

        return res.data
    }

    /**
     * Get access token from private parameter of Authentication class
     *
     * @returns {string} Return generated token
     * @memberof Authentication
     */
    public async getAccessToken(): Promise<string> {
        if(this._accessToken && !this.isTokenExpired()) {
            return Promise.resolve(this._accessToken);
        }

        this._accessToken = await this.generateToken();

        return this._accessToken
    }
}
