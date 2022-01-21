import * as process from "process";
import axios from "axios";

export class Authentication {
    private _accessToken: string | undefined

    private get username(): string {
        if (process.env.EAI_USERNAME) {
            return process.env.EAI_USERNAME
        }

        throw new Error("Missing env variable EAI_USERNAME")
    }

    private get password(): string {
        if (process.env.EAI_PASSWORD) {
            return process.env.EAI_PASSWORD
        }

        throw new Error("Missing env variable EAI_PASSWORD")
    }

    private isTokenExpired = (): boolean => {
        if(!this._accessToken) {
            return false
        }

        const payloadBase64 = this._accessToken.split('.')[1]
        const decodedJson = Buffer.from(payloadBase64, 'base64').toString()
        const decoded: {exp: number} = JSON.parse(decodedJson)
        const exp = decoded.exp
        return (Date.now() >= exp * 1000)
    }

    private async generateToken(): Promise<string> {
        const data = {
            username: this.username,
            password: this.password
        }

        const res = await axios.post('https://developer.expert.ai/oauth2/token', data)

        return res.data
    }

    public async getAccessToken(): Promise<string> {
        if(this._accessToken && !this.isTokenExpired()) {
            return Promise.resolve(this._accessToken);
        }

        this._accessToken = await this.generateToken();

        console.log(this._accessToken)

        return this._accessToken
    }
}
