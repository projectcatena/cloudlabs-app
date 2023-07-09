import { User } from "@/entity/entity";

enum ROLES {
    ADMIN = "ADMIN",
    TUTOR = "TUTOR",
    USER = "USER"
}

function parseToken(token: string) {
    let payload: any = token.split(".")[1];
    payload = JSON.parse(Buffer.from(payload, 'base64').toString());
    return payload;
}

function checkLoggedIn(acceptedRole: string, token: string) {
    try {

        let payload = parseToken(token);
        let roleAuth = checkRole(token, acceptedRole);

        if (roleAuth) {
            return payload["exp"] && payload["exp"] > Date.now() / 1000;
        }

    } catch (e) {
        return false;
    }
}

function getUser(token: string) {
    let payload = parseToken(token);

    let username = payload["sub"];
    let email = payload["email"];
    let roles: string[] = payload["roles"].split(" ");
    let user = new User(username, roles, email);
    console.log(user);

    return user;
}

function checkRole(jwt: string, acceptRole: string) {
    let payload = parseToken(jwt);
    let roles: string[] = payload["roles"].split(" ");

    return roles.some((item) => item === acceptRole);
}

async function signout() {

    const res = await fetch("http://localhost:8080/api/signout", {
        method: "POST",
        credentials: "include", // please include this in every request to backend
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
    }).then(function(response) {
        return response.json();
    });

}

const authService = {
    checkLoggedIn,
    checkRole,
    ROLES,
    signout,
    getUser
};

export {
    ROLES, checkLoggedIn, checkRole, signout, getUser
};

export default authService;
