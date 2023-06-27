enum Roles {
    admin = "ADMIN",
    tutor = "TUTOR",
    user = "USER"
}

function checkLoggedIn(acceptedRole:string) {
    let token = localStorage.getItem("token");
    if (!token) {
        return false;
    }

    try {
        let payload:any = token.split(".")[1];
        payload = JSON.parse(atob(payload));
        let role: string[] = payload["roles"].split(" ");
        let roleAuth = checkRole(role, acceptedRole);
        if(roleAuth){
            return payload["exp"] && payload["exp"] > Date.now() / 1000;
        }
        //else return false;
        
    } catch (e) {
        return false;
    }
}

function checkRole(role:string[], acceptRole:string) {
    for (var i in role) {
        if (role[i] == acceptRole){
            return true
        }
    }
    return false;
}

function setToken(token:any) {
    localStorage.setItem("token", token);
}

function getToken() {
    return localStorage.getItem("token");
}

function logout() {
    localStorage.removeItem("token");
}

const authService = {
    logout,
    setToken,
    getToken,
    checkLoggedIn,
    checkRole,
    Roles
};

export {
    Roles, checkLoggedIn, checkRole, getToken,
    logout,
    setToken
};

export default authService;