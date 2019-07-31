export interface UserData {

    firstName: String;
    lastName: string;
    userName: string;
    role: string;
    token: string;
    message: Number;
    businessAcctId: Number;

}
export interface LoginData {

    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    jti: string;

}
