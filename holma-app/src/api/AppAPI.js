import GroupBO from './GroupBO';
import UserBO from './UserBO';
import ShoppingListBO from './ShoppingListBO';
import ArticleBO from './ArticleBO'
import ListEntryBO from './ListEntryBO'

export default class AppAPI {

    static #api = null;

    // #appServerBaseURL = 'http://localhost:5000/app';
    #appServerBaseURL = 'https://holma-sw-praktikum.ey.r.appspot.com/app';



    // User Related
    #getUsersURL = () => `${this.#appServerBaseURL}/users`;
    #createUserURL = () => `${this.#appServerBaseURL}/users`;
    #updateUserURL = (userId) => `${this.#appServerBaseURL}/user/${userId}`;
    #deleteUserURL = (userId) => `${this.#appServerBaseURL}/user/${userId}`;
    #getUserByIdURL = (userId) => `${this.#appServerBaseURL}/user/${userId}`;
    #getUserByGoogleIdURL = (googleId) => `${this.#appServerBaseURL}/user/by-google-id/${googleId}`;
    #getUsersByNameURL = (name) => `${this.#appServerBaseURL}/by-name/${name}`;

    #getGroupsByUserIdURL = (userId) => `${this.#appServerBaseURL}/user/${userId}/groups`;
    #createGroupURL = (userId) => `${this.#appServerBaseURL}/user/${userId}/groups`;
    #addUserToGroupURL = (groupId, userId) => `${this.#appServerBaseURL}/group/${groupId}/user/${userId}`;
    #deleteUsersFromGroupURL =(groupId, userId) => `${this.#appServerBaseURL}/group/${groupId}/user/${userId}`;

    // Group Related
    #getGroupsURL = () => `${this.#appServerBaseURL}/groups`;
    #getGroupByIdURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}`;
    #getGroupsByNameURL = (name) => `${this.#appServerBaseURL}/by-name/${name}`;
    #updateGroupURL = (groupId) => `${this.#appServerBaseURL}/groups/${groupId}`;
    #deleteGroupURL = (groupId) => `${this.#appServerBaseURL}/groups/${groupId}`;

    #getUsersByGroupIdURL = (groupId) =>`${this.#appServerBaseURL}/group/${groupId}/users`;
  
    // Article Related
    #getArticlesURL = () => `${this.#appServerBaseURL}/articles`;
    #createArticleURL = (groupId) => `${this.#appServerBaseURL}/groups/${groupId}/articles`;
    #updateArticleURL = (articleId) =>  `${this.#appServerBaseURL}/articles/${articleId}`;
    #deleteArticleURL = (articleId) => `${this.#appServerBaseURL}/articles/${articleId}` ;
    #getArticleByIdURL = (articleId) => `${this.#appServerBaseURL}/articles/${articleId}`;
    #getArticleByNameURL = (name) => `${this.#appServerBaseURL}/by-name/${name}`;



    // Shoppinglist related
    #getShoppingListsByGroupIdURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}/shoppinglists`;
    #createShoppingListURL = (groupId) => `${this.#appServerBaseURL}/groups/${groupId}/shoppingLists`;
    #getShoppingListByIdURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppingLists/${shoppingListId}`;
    #updateShoppingListURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppingLists/${shoppingListId}`;
    #deleteShoppingListURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppingLists/${shoppingListId}`;
    
    // ListEntry related
    #getListEntryURL = () => `${this.#appServerBaseURL}/listentries`;
    #getListEntryByIdURL = (listEntryId) => `${this.#appServerBaseURL}/listentry/${listEntryId}`;
    #getListEntryByShoppingListIdURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppingLists/${shoppingListId}/listentries`; 
    #createListEntryURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppingLists/${shoppingListId}/listentries`;
    #updateListEntryURL = (listEntryId) => `${this.#appServerBaseURL}/listentry/${listEntryId}`;
    #deleteListEntryURL = (listEntryId) => `${this.#appServerBaseURL}/listentry/${listEntryId}`;

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
            console.log("Fetching", url)
            if (!response.ok){
                console.log(`${response.status} ${response.statusText}`);
                //throw Error(`${response.status} ${response.statusText}`)
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
    };

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
    };

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
    };

    getUserById(userId) {
        return this.#fetchAdv(this.#getUserByIdURL(userId)).then((responseJSON) => {
            let responseUser = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseUser)
            })
        })
    };

    getUserByGoogleId(googleId) {
        return this.#fetchAdv(this.#getUserByGoogleIdURL(googleId)).then((responseJSON) => {
            let responseUser = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseUser)
            })
        })
    };

    getUsersByName(name) {
        return this.#fetchAdv(this.#getUsersByNameURL(name)).then((responseJSON) => {
            let responseUsers = UserBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseUsers)
            })
        })
    };

    addUserToGroup(groupId, userId) {
        return this.#fetchAdv(this.#addUserToGroupURL(groupId, userId), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain'
            },
        }).then((responseJSON) => {
            let responseGroup = GroupBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGroup)
            })
        })
    };

    deleteUsersFromGroup(group, user) {
        return this.#fetchAdv(this.#deleteUsersFromGroupURL(group, user), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
        })
    };
    
    getGroupsByUserId(userId) {
        return this.#fetchAdv(this.#getGroupsByUserIdURL(userId)).then((responseJSON) => {
            let responseGroups = GroupBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseGroups)
            })
        })
    };

    createGroup(group) {
        console.log("Creating group:", group)
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
    };

    getGroups() {
        return this.#fetchAdv(this.#getGroupsURL()).then((responseJSON) => {
            let responseGroups = GroupBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseGroups)
            })
        })
    };

    getGroupById(groupId) {
        return this.#fetchAdv(this.#getGroupByIdURL(groupId)).then((responseJSON) => {
            let responseGroups = GroupBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGroups)
            })
        })
    };

    getGroupsByName(name) {
        return this.#fetchAdv(this.#getGroupsByNameURL(name)).then((responseJSON) => {
            let responseGroups = GroupBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseGroups)
            })
        })
    };

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
    };

    deleteGroup(group) {
        return this.#fetchAdv(this.#deleteGroupURL(group.getId()), {
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
    };

    getUsersByGroupId(groupId) {
        return this.#fetchAdv(this.#getUsersByGroupIdURL(groupId)).then((responseJSON) => {
            let responseUsers = UserBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseUsers)
            })
        })
    }

    getShoppingListsByGroupId(groupId) {
        return this.#fetchAdv(this.#getShoppingListsByGroupIdURL(groupId)).then((responseJSON) => {
            let responseShoppingLists = ShoppingListBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseShoppingLists)
            })
        })
    }

    getShoppingListById(shoppingListId) {
        return this.#fetchAdv(this.#getShoppingListByIdURL(shoppingListId)).then((responseJSON) => {
            let responseShoppingLists = ShoppingListBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseShoppingLists)
            })
        })
    }

    createShoppingList(shoppingLists) {
        console.log("Creating shoppingList:", shoppingLists)
        return this.#fetchAdv(this.#createShoppingListURL(shoppingLists.getGroupId()), {
        method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(shoppingLists)
        }).then((responseJSON) => {
            let responseShoppingLists = ShoppingListBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseShoppingLists)
            })
        })
    }

    updateShoppingList(shoppingLists) {
        return this.#fetchAdv(this.#updateShoppingListURL(shoppingLists.getId()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(shoppingLists)
        }).then((responseJSON) => {
            let responseShoppingLists = ShoppingListBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseShoppingLists)
            })
        })
    }

    deleteShoppingList(shoppingLists) {
        return this.#fetchAdv(this.#deleteShoppingListURL(shoppingLists.getId()), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(shoppingLists)
        }).then((responseJSON) => {
            let responseShoppingLists = ShoppingListBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseShoppingLists)
            })
        })
    }


    getArticles() {
        return this.#fetchAdv(this.#getArticlesURL()).then((responseJSON) => {
            let responseArticles = ArticleBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseArticles)
            })
        })
    };

    createArticle(article) {
        console.log("Creating Article:", article)
        return this.#fetchAdv(this.#createArticleURL(article.getGroupId()), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(article)
        }).then((responseJSON) => {
            let responseArticle = ArticleBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseArticle)
            })
        })
    };

    getArticlesByName(name) {
        return this.#fetchAdv(this.#getArticleByNameURL(name)).then((responseJSON) => {
            let responseArticles = ArticleBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseArticles)
            })
        })
    };

    updateArticle(article) {
        return this.#fetchAdv(this.#updateArticleURL(article.getId()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(article)
        }).then((responseJSON) => {
            let responseArticle = ArticleBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseArticle)
            })
        })
    };

    deleteArticle(article) {
        return this.#fetchAdv(this.#deleteArticleURL(article.getId()), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(article)
        }).then((responseJSON) => {
            let responseArticle = ArticleBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseArticle)
            })
        })
    };


    getArticleById(articleId) {
        return this.#fetchAdv(this.#getArticleByIdURL(articleId)).then((responseJSON) => {
            let responseArticle = ArticleBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseArticle)
            })
        })
    };


    getListEntryByShoppingListId(shoppingListId) {
        return this.#fetchAdv(this.#getListEntryByShoppingListIdURL(shoppingListId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    } 

    getListEntryById(listEntryId) {
        return this.#fetchAdv(this.#getListEntryByIdURL(listEntryId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }

    getListEntries() {
        return this.#fetchAdv(this.#getListEntryURL()).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    };

    createListentries(listentries) {
        console.log("Creating a ListEntry:", listentries)
        return this.#fetchAdv(this.#createListEntryURL(listentries.getShoppingListId()), {
        method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(listentries)
        }).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }

    updateListEntry(listentries) {
        return this.#fetchAdv(this.#updateListEntryURL(listentries.getId()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(listentries)
        }).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    };

    deleteListEntry(listentries) {
        return this.#fetchAdv(this.#deleteListEntryURL(listentries.getId()), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(listentries)
        }).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    };
}
