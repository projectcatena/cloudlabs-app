
export class LoginResponse {
    jwt;

    constructor(obj: any) {
        this.jwt = obj.jwt;
    }
}

export class User {
    username: string;
    role: string[];
    email: string;

    constructor(username: string, role: string[], email: string) {
        this.username = username;
        this.role = role;
        this.email = email;
    }
}
