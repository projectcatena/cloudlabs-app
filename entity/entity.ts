
export class LoginResponse {
    jwt;

    constructor(obj:any) {
        this.jwt = obj.jwt;
    }
}

export class User {
    username;
    role;

    constructor(obj:any) {
        this.username = obj.username;
        this.role = obj.role;
    }
}