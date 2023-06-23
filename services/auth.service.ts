import { LoginResponse } from "../entity/entity";
import { client } from "./client";

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
        console.log(role,roleAuth)
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

//Crafting POST Request to get JWT token
function login(email:string, password:string) {
    let params = {
        email,
        password
    };

    const data = Object.entries(params)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&');

    return new Promise((resolve, reject) => {
        client.post('login', data, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            resolve(new LoginResponse(response.data));
        }).catch(reason => {
            reject("Authentication failed");
        })
    });
}

//Crafting POST Request to get regster user
function signup(fullName:string,email:string, password:string) {
    let params = {
        fullName,
        email,
        password
    };

    const data = Object.entries(params)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&');

    return new Promise((resolve, reject) => {
        client.post('signup', data, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            resolve(console.log(response.data));
        }).catch(reason => {
            reject(console.log(reason));
        })
    });
}

const authService = {
    login,
    logout,
    setToken,
    getToken,
    checkLoggedIn,
    checkRole,
    signup
};

export {
    checkLoggedIn, checkRole, getToken, login,
    logout,
    setToken,
    signup
};

export default authService;