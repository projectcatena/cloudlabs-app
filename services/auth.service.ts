
enum Roles {
    admin = "ADMIN",
    tutor = "TUTOR",
    user = "USER"
}

function checkLoggedIn(acceptedRole: string, token: string) {
    // let token = localStorage.getItem("token");
    // let token = getCookie('jwt');
    //
    // if (!token) {
    //     return false;
    // }

    try {

        let payload: any = token.split(".")[1];
        payload = JSON.parse(atob(payload));
        console.log(payload);
        let role: string[] = payload["roles"].split(" ");
        let roleAuth = checkRole(role, acceptedRole);
        if (roleAuth) {
            return payload["exp"] && payload["exp"] > Date.now() / 1000;
        }
        //else return false;

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

function getCookie(context:any) {
    let token = context.req.cookies["jwt"];
    console.log(token);
    return token;
}

const authService = {
    checkLoggedIn,
    checkRole,
    Roles,
    getCookie
};

export {
    Roles, checkLoggedIn, checkRole, getCookie
};

export default authService;
