import GroupBO from './GroupBO';
import UserBO from './UserBO';
import ShoppingListBO from './ShoppingListBO';
import ArticleBO from './ArticleBO'
import ListEntryBO from './ListEntryBO'
import RetailerBO from './RetailerBO'

export default class AppAPI {

    static #api = null;

    #appServerBaseURL = 'http://localhost:5000/app';
    
    // Remote Backend:
    // #appServerBaseURL = 'https://holma-sw-praktikum.ey.r.appspot.com/app';



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
    #getGroupsURL = () => `${this.#appServerBaseURL}/group`;
    #getGroupByIdURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}`;
    #getGroupsByNameURL = (name) => `${this.#appServerBaseURL}/by-name/${name}`;
    #updateGroupURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}`;
    #deleteGroupURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}`;

    #getUsersByGroupIdURL = (groupId) =>`${this.#appServerBaseURL}/group/${groupId}/users`;
  
    // Article Related
    #getArticlesURL = () => `${this.#appServerBaseURL}/articles`;
    #createArticleURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}/articles`;
    #updateArticleURL = (articleId) =>  `${this.#appServerBaseURL}/article/${articleId}`;
    #deleteArticleURL = (articleId) => `${this.#appServerBaseURL}/article/${articleId}` ;
    #getArticleByIdURL = (articleId) => `${this.#appServerBaseURL}/article/${articleId}`;
    #getArticlesByNameURL = (name) => `${this.#appServerBaseURL}/by-name/${name}`;



    // Shoppinglist related
    #getShoppingListsByGroupIdURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}/shoppinglists`;
    #createShoppingListURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}/shoppinglists`;
    #getShoppingListByIdURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppinglist/${shoppingListId}`;
    #updateShoppingListURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppinglist/${shoppingListId}`;
    #deleteShoppingListURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppinglist/${shoppingListId}`;
    
    // ListEntry related
    #getListEntryURL = () => `${this.#appServerBaseURL}/listentries`;
    #getListEntryByIdURL = (listEntryId) => `${this.#appServerBaseURL}/listentry/${listEntryId}`;
    #getListEntriesByUserIdURL = (userId) => `${this.#appServerBaseURL}/user/${userId}/listentries`;
    
    #getListEntriesByArticleIdURL = (articleId) => `${this.#appServerBaseURL}/article/${articleId}/listentries`;
    #getListEntriesByShoppingListIdURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppinglist/${shoppingListId}/listentries`; 
    #getListEntriesByRetailerIdURL = (retailerId) => `${this.#appServerBaseURL}/retailer/${retailerId}/listentries`; 

    #createListEntryURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppinglist/${shoppingListId}/listentries`;
    #updateListEntryURL = (listEntryId) => `${this.#appServerBaseURL}/listentry/${listEntryId}`;
    #deleteListEntryURL = (listEntryId) => `${this.#appServerBaseURL}/listentry/${listEntryId}`;

    // Standardarticle related
    #getListEntriesByGroupIdURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}/listentries`; 
    #addStandardArticleToGroupURL = (groupId, listEntryId) => `${this.#appServerBaseURL}/group/${groupId}/listentry/${listEntryId}`;
    #addStandardArticlesToShoppingListURL = (groupId, shoppingListId) => `${this.#appServerBaseURL}/group/${groupId}/shoppinglist/${shoppingListId}`;
    #deleteStandardArticleFromGroupURL =(groupId, listEntryId) => `${this.#appServerBaseURL}/group/${groupId}/listentry/${listEntryId}`;

    // Retailer related
    #getRetailersURL = () => `${this.#appServerBaseURL}/retailers`;
    #getRetailerByIdURL = (retailerId) => `${this.#appServerBaseURL}/retailer/${retailerId}`;
    #getRetailersByNameURL = (name) => `${this.#appServerBaseURL}/by-name/${name}`;

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
        console.log("Creating Group:", group)
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
        console.log("Creating ShoppingList:", shoppingLists)
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
        return this.#fetchAdv(this.#getArticlesByNameURL(name)).then((responseJSON) => {
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

    getListEntriesByUserId(userId) {
        return this.#fetchAdv(this.#getListEntriesByUserIdURL(userId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }; 

    getListEntriesByArticleId(articleId) {
        return this.#fetchAdv(this.#getListEntriesByArticleIdURL(articleId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    } 

     getListEntriesByShoppingListId(shoppingListId) {
        return this.#fetchAdv(this.#getListEntriesByShoppingListIdURL(shoppingListId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }  

     getListEntriesByRetailerId(retailerId) {
        return this.#fetchAdv(this.#getListEntriesByRetailerIdURL(retailerId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }; 

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

    createListentries(listentry) {
        console.log("Creating a ListEntry:", listentry)
        return this.#fetchAdv(this.#createListEntryURL(listentry.getShoppingListId()), {
        method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(listentry)
        }).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }

    updateListEntry(listentry) {
        return this.#fetchAdv(this.#updateListEntryURL(listentry.getId()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(listentry)
        }).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    };

    deleteListEntry(listentry) {
        return this.#fetchAdv(this.#deleteListEntryURL(listentry.getId()), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(listentry)
        }).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    };

    getRetailers() {
        return this.#fetchAdv(this.#getRetailersURL()).then((responseJSON) => {
            let responseRetailer = RetailerBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseRetailer)
            })
        })
    };

    getRetailerById(retailerId) {
        return this.#fetchAdv(this.#getRetailerByIdURL(retailerId)).then((responseJSON) => {
            let responseRetailer = ListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseRetailer)
            })
        })
    }

    getRetailersByName(name) {
        return this.#fetchAdv(this.#getRetailersByNameURL(name)).then((responseJSON) => {
            let responseRetailer = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseRetailer)
            })
        })
    };

    getListEntryByGroupId(groupId) {
        return this.#fetchAdv(this.#getListEntriesByGroupIdURL(groupId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }

    addStandardArticleToGroup(groupId, listEntryId) {
        return this.#fetchAdv(this.#addStandardArticleToGroupURL(groupId, listEntryId), {
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

    addStandardArticlesToShoppingList(groupId, shoppingListId) {
        return this.#fetchAdv(this.#addStandardArticlesToShoppingListURL(groupId, shoppingListId), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain'
            },
        }).then((responseJSON) => {
            let responseShoppingLists = ShoppingListBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseShoppingLists)
            })
        })
    };

    deleteStandardArticleFromGroup(group, listentry) {
        return this.#fetchAdv(this.#deleteStandardArticleFromGroupURL(group, listentry), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
        })
    };
}