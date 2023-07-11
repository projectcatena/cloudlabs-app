import { AuthUser, useAuth } from "@/contexts/AuthContext";

enum Roles {
    admin = "ADMIN",
    tutor = "TUTOR",
    user = "USER"
}

export function parseToken(jwt: string) {

    let payload: any = jwt.split(".")[1];
    payload = JSON.parse(Buffer.from(payload, 'base64').toString());

    let role: string[] = payload["roles"].split(" ");

    const user: AuthUser = {
        email: payload["email"],
        name: payload["sub"],
        roles: role,
        jwt: jwt,
        expiration: payload["exp"]
    }

    return user;
}

function checkLoggedIn(acceptedRole: string, token: string) {
    try {

        const user = parseToken(token);

        let roleAuth = checkRole(user.roles, acceptedRole);

        if (roleAuth) {
            return user.expiration && parseInt(user.expiration) > Date.now() / 1000;
            // return payload["exp"] && payload["exp"] > Date.now() / 1000;
        }

    } catch (e) {
        return false;
    }
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
    }).finally(() => {
        localStorage.removeItem('user');
    });
}

const authService = {
    checkLoggedIn,
    checkRole,
    Roles,
    signout
};

export {
    Roles, checkLoggedIn, checkRole, signout
};

export default authService;
