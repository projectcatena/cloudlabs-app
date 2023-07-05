import { GetServerSidePropsContext } from "next";

enum Roles {
    admin = "ADMIN",
    tutor = "TUTOR",
    user = "USER"
}

function checkLoggedIn(acceptedRole: string, token: string) {
    try {

        let payload: any = token.split(".")[1];
        payload = JSON.parse(Buffer.from(payload, 'base64').toString());

        let role: string[] = payload["roles"].split(" ");
        let roleAuth = checkRole(role, acceptedRole);

        if (roleAuth) {
            return payload["exp"] && payload["exp"] > Date.now() / 1000;
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

function getCookie(context: GetServerSidePropsContext) {
    let token = context.req.cookies["jwt"];

    return token;
}

async function logout() {

    const res = await fetch("http://localhost:8080/api/signout", {
        method: "POST",
        credentials: "include", // please include this in every request to backend
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
    }).then(function(response) {
        return response.json();
    })

}

const authService = {
    checkLoggedIn,
    checkRole,
    Roles,
    getCookie,
    logout
};

export {
    Roles, checkLoggedIn, checkRole, getCookie, logout
};

export default authService;
