import { User } from "../entity/entity";
import { secureClient } from "./client";

function getModuleInfo() {
    return new Promise((resolve, reject) => {
        secureClient.get("module")
            .then(response => resolve(new User(response.data)))
            .catch(e => reject("Unable to fetch user"));
    });
}

function getUserInfo() {
    return new Promise((resolve, reject) => {
        secureClient.get("users")
            .then(response => resolve(new User(response.data)))
            .catch(e => reject("Unable to fetch user"));
    });
}

export {
    getModuleInfo,
    getUserInfo
};

