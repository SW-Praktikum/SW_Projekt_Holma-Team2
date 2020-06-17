import GroupBO from './GroupBO';
import UserBO from './UserBO';

export default class AppAPI {

    static #api = null;

    #appServerBaseURL = '/app';



    // User Related
    #getUsersURL = () => `${this.#appServerBaseURL}/users`;
    #createUserURL = () => `${this.#appServerBaseURL}/users`;
    #updateUserURL = (userId) => `${this.#appServerBaseURL}/users/${userId}`;
    #deleteUserURL = (userId) => `${this.#appServerBaseURL}/users/${userId}`;
    #getUserByIdURL = (userId) => `${this.#appServerBaseURL}/users/${userId}`;
    #getUsersByNameURL = (name) => `${this.#appServerBaseURL}/by-name/${name}`;

    #getGroupsByUserIdURL = (userId) => `${this.#appServerBaseURL}/users/${userId}/groups`;
    #createGroupURL = (userId) => `${this.#appServerBaseURL}/users/${userId}/groups`;


    // Group Related
    #getGroupsURL = () => `${this.#appServerBaseURL}/groups`;
    #getGroupByIdURL = (groupId) => `${this.#appServerBaseURL}/groups/${groupId}`;
    #updateGroupURL = (groupId) => `${this.#appServerBaseURL}/groups/${groupId}`;
    #deleteGroupURL = (groupId) => `${this.#appServerBaseURL}/groups/${groupId}`;

    #getUsersByGroupIdURL = (groupId) =>`${this.#appServerBaseURL}/groups/${groupId}/users`;


    static getAPI() {
        if (this.#api == null) {
            this.#api = new AppAPI();
        }
        return this.#api;
    }

    // fetchAdv frägt eine URL an und gibt die Antwort direkt als JSON Objekt zurück
    // init wird später für alle requests verwendet, die nicht GET sind:
    // default 'GET' wird überschrieben mit jeweiliger Methode
    #fetchAdv = (url, init) => fetch(url, init)
        .then(response => {
            if (!response.ok){
                console.log(`${response.status} ${response.statusText}`);
                throw Error(`${response.status} ${response.statusText}`)
            }
            return response.json();
        });

    getUsers() {
        return this.#fetchAdv(this.#getUsersURL()).then((responseJSON) => {
            let responseUsers = UserBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseUsers)
            })
        })
    };

    createUser(user) {
        return this.#fetchAdv(this.#createUserURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then((responseJSON) => {
            let responseUser = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseUser)
            })
        })
    }

    updateUser(user) {
        return this.#fetchAdv(this.#updateUserURL(user.getId()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then((responseJSON) => {
            let responseUser = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseUser)
            })
        })
    }

    deleteUser(user) {
        return this.#fetchAdv(this.#deleteUserURL(user.getId()), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then((responseJSON) => {
            let responseUser = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseUser)
            })
        })
    }

    getUserById(userId) {
        return this.#fetchAdv(this.#getUserByIdURL(userId)).then((responseJSON) => {
            let responseUser = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseUser)
            })
        })
    }

    getUsersByName(name) {
        return this.#fetchAdv(this.#getUsersByNameURL(name)).then((responseJSON) => {
            let responseUsers = UserBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseUsers)
            })
        })
    }

    getGroupsByUserId(userId) {
        return this.#fetchAdv(this.#getGroupsByUserIdURL(userId)).then((responseJSON) => {
            let responseGroups = GroupBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseGroups)
            })
        })
    }

    createGroup(group) {
        return this.#fetchAdv(this.#createGroupURL(group.getOwner()), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(group)
        }).then((responseJSON) => {
            let responseGroup = GroupBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGroup)
            })
        })
    }

    getGroups() {
<<<<<<< HEAD
        return this.#fetchAdv(this.#getGroupsURL()).then((responseJSON) => {
=======
        return this.#fetchAdv(this.#geGroupsURL()).then((responseJSON) => {
>>>>>>> ce9bc51a42c93ac35d3fde1a44b1bab882a65aa8
            let responseGroups = GroupBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseGroups)
            })
        })
<<<<<<< HEAD
    };

    getGroupById(groupId) {
        return this.#fetchAdv(this.#getGroupByIdURL(groupId)).then((responseJSON) => {
            let responseGroups = GroupBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGroups)
=======
    }

    getGroupById(groupId) {
        return this.#fetchAdv(this.#getGroupByIdURL(groupId)).then((responseJSON) => {
            let responseGroup = GroupBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGroup)
>>>>>>> ce9bc51a42c93ac35d3fde1a44b1bab882a65aa8
            })
        })
    }

    updateGroup(group) {
        return this.#fetchAdv(this.#updateGroupURL(group.getId()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(group)
        }).then((responseJSON) => {
            let responseGroup = GroupBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGroup)
            })
        })
    }

    deleteGroup(group) {
<<<<<<< HEAD
        return this.#fetchAdv(this.#deleteGroupURL(group.getId()), {
=======
        return this.#fetchAdv(this.#deleteGroupURL(user.getId()), {
>>>>>>> ce9bc51a42c93ac35d3fde1a44b1bab882a65aa8
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(group)
        }).then((responseJSON) => {
            let responseGroup = GroupBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGroup)
            })
        })
    }

    getUsersByGroupId(groupId) {
<<<<<<< HEAD
        return this.#fetchAdv(this.#getUsersByGroupIdURL(groupId)).then((responseJSON) => {
=======
        return this.#fetchAdv(this.#getUserByGroupIdURL(groupId)).then((responseJSON) => {
>>>>>>> ce9bc51a42c93ac35d3fde1a44b1bab882a65aa8
            let responseUsers = UserBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseUsers)
            })
        })
    }
}

