import { User } from "@/entity/entity";

enum Roles {
    admin = "ADMIN",
    tutor = "TUTOR",
    user = "USER"
}

function parseToken(token: string) {
    let payload: any = token.split(".")[1];
    payload = JSON.parse(Buffer.from(payload, 'base64').toString());
    return payload;
}

function checkLoggedIn(acceptedRole: string, token: string) {
    try {
        let payload = parseToken(token);

        let role: string[] = payload["roles"].split(" ");
        let roleAuth = checkRole(role, acceptedRole);

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
    let role: string[] = payload["roles"].split(" ");
    let user = new User(username, role, email);

    return user;
}

function checkRole(role: string[], acceptRole: string) {
    for (var i in role) {
        if (role[i] == acceptRole) {
            return true
        }
    }
    return false;
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
    Roles,
    signout,
    getUser
};

export {
    Roles, checkLoggedIn, checkRole, signout, getUser
};

export default authService;
