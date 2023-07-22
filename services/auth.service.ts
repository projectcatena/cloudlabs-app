import { AuthUser, Role } from "@/contexts/AuthContext";

export function parseToken(jwt: string) {

    let payload: any = jwt.split(".")[1];
    payload = JSON.parse(Buffer.from(payload, 'base64').toString());

    // let role: Role[] = payload["roles"].split(" ");
    let role: Role[] = payload["roles"];

    const user: AuthUser = {
        email: payload["sub"],
        fullname: payload["fullname"],
        username: payload["username"],
        roles: role,
        expiration: payload["exp"],
        isTutor: isRoleValid(role, "TUTOR"),
        isAdmin: isRoleValid(role, "ADMIN")
    }

    return user;
}

export function isLogin(acceptedRole: string, token: string) {
    try {

        const user = parseToken(token);

        let roleAuth = isRoleValid(user.roles, acceptedRole);

        if (roleAuth) {
            return user.expiration && parseInt(user.expiration) > Date.now() / 1000;
            // return payload["exp"] && payload["exp"] > Date.now() / 1000;
        }

    } catch (e) {
        return false;
    }
}

export function isRoleValid(role: Role[], acceptRole: string) {
    for (var i in role) {
        if (role[i].name == acceptRole) {
            return true
        }
    }
    return false;
}

export async function signOut() {

    const res = await fetch("http://localhost:8080/api/auth/signout", {
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
