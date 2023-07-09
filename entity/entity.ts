
export class LoginResponse {
    jwt;

    constructor(obj: any) {
        this.jwt = obj.jwt;
    }
}

export class User {
    username: string;
    roles: string[];
    email: string;

    constructor(username: string, roles: string[], email: string) {
        this.username = username;
        this.roles = roles;
        this.email = email;
    }
}
