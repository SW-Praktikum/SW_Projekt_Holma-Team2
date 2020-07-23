import ArticleBO from './ArticleBO';
import GroupBO from './GroupBO';
import ListEntryBO from './ListEntryBO';
import RetailerBO from './RetailerBO';
import ShoppingListBO from './ShoppingListBO';
import UserBO from './UserBO';

export default class AppAPI {

    static #api = null;

    //Local Python Backend
    //#appServerBaseURL = 'http://localhost:5000/app';
    
    // Remote Backend:
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
    #updateGroupURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}`;
    #deleteGroupURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}`;

    #getUsersByGroupIdURL = (groupId) =>`${this.#appServerBaseURL}/group/${groupId}/users`;
  
    // Article Related
    #getArticlesURL = () => `${this.#appServerBaseURL}/articles`;
    #getArticlesByGroupIdURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}/articles`;
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
    #archiveShoppingListURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppinglist/${shoppingListId}/archive`;

    // ListEntry related
    #getListEntryURL = () => `${this.#appServerBaseURL}/listentries`;
    #getListEntryByIdURL = (listEntryId) => `${this.#appServerBaseURL}/listentry/${listEntryId}`;
    #getListEntriesByUserIdURL = (userId) => `${this.#appServerBaseURL}/user/${userId}/listentries`;
    #getListEntriesIncludeArchivedByUserIdURL = (userId) => `${this.#appServerBaseURL}/user/${userId}/listentries/include-archived`;
    
    #getListEntriesByArticleIdURL = (articleId) => `${this.#appServerBaseURL}/article/${articleId}/listentries`;
    #getListEntriesByShoppingListIdURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppinglist/${shoppingListId}/listentries`; 
    #getListEntriesByRetailerIdURL = (retailerId) => `${this.#appServerBaseURL}/retailer/${retailerId}/listentries`; 
    #getCheckedListEntriesByShoppingListIdURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppinglist/${shoppingListId}/listentries/checked`; 

    #getListEntriesByGroupIdURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}/listentries`;
    #getUpdatedListEntriesByTimePeriodURL = (fromDate, toDate) => `${this.#appServerBaseURL}/listentries/by-date/${fromDate}/${toDate}`; 

    #createListEntryURL = (shoppingListId) => `${this.#appServerBaseURL}/shoppinglist/${shoppingListId}/listentries`;
    #updateListEntryURL = (listEntryId) => `${this.#appServerBaseURL}/listentry/${listEntryId}`;
    #deleteListEntryURL = (listEntryId) => `${this.#appServerBaseURL}/listentry/${listEntryId}`;

    // Standardarticle related
    #getStandardArticlesByGroupIdURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}/standardarticles`; 
    #addStandardArticleToGroupURL = (groupId, listEntryId) => `${this.#appServerBaseURL}/group/${groupId}/standardarticle/${listEntryId}`;
    #addStandardArticlesToShoppingListURL = (groupId, shoppingListId) => `${this.#appServerBaseURL}/group/${groupId}/shoppinglist/${shoppingListId}/standardarticles`;
    #deleteStandardArticleFromGroupURL =(groupId, listEntryId) => `${this.#appServerBaseURL}/group/${groupId}/standardarticle/${listEntryId}`;

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
    #fetchAdv = (url, init={credentials: 'include'}) => fetch(url, init)
        .then(response => {
            if (typeof init !== 'undefined' && "body" in init) {
                //console.log("[" + init.method + "]", url, JSON.parse(init.body))
            }
            else {
                //console.log("[GET]", url)
            }
            if (!response.ok){
                //console.log(`${response.status} ${response.statusText}`);
                //throw Error(`${response.status} ${response.statusText}`)
            }
            return response.json();
        });

        // Gibt eine Promise zurück mit einer Liste von UserBOs

    getUsers() {
        return this.#fetchAdv(this.#getUsersURL()).then((responseJSON) => {
            let responseUsers = UserBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseUsers)
            })
        })
    };

        // Gibt ein Promise zurück mit ein bestimmten UserBO
        /* Adds a User and returns a Promise, 
        which resolves to a new User object with the Name, Email and google_id of the parameter UserBO object. */
    createUser(user) {
        return this.#fetchAdv(this.#createUserURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Credentials': 'include'
            },
            credentials:'include',
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
            credentials:'include',
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
            credentials:'include',
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
            credentials:'include',
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
            credentials:'include',
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
        return this.#fetchAdv(this.#createGroupURL(group.getOwner()), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(group),
            credentials: 'include'
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
            credentials:'include',
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
            credentials:'include',
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

    createShoppingList(shoppingList) {
        return this.#fetchAdv(this.#createShoppingListURL(shoppingList.getGroupId()), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            credentials:'include',
            body: JSON.stringify(shoppingList)
        }).then((responseJSON) => {
            let responseShoppingList = ShoppingListBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseShoppingList)
            })
        })
    }

    updateShoppingList(shoppingList) {
        return this.#fetchAdv(this.#updateShoppingListURL(shoppingList.getId()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            credentials:'include',
            body: JSON.stringify(shoppingList)
        }).then((responseJSON) => {
            let responseShoppingList = ShoppingListBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseShoppingList)
            })
        })
    }

    deleteShoppingList(shoppingList) {
        return this.#fetchAdv(this.#deleteShoppingListURL(shoppingList.getId()), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            credentials:'include',
            body: JSON.stringify(shoppingList)
        }).then((responseJSON) => {
            let responseShoppingList = ShoppingListBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseShoppingList)
            })
        })
    }

    archiveShoppingList(shoppingList) {
        return this.#fetchAdv(this.#archiveShoppingListURL(shoppingList.getId()), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            credentials:'include',
            body: JSON.stringify(shoppingList)
        }).then((responseJSON) => {
            let responseShoppingList = ShoppingListBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseShoppingList)
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

    getArticlesByGroupId(groupId) {
        return this.#fetchAdv(this.#getArticlesByGroupIdURL(groupId)).then((responseJSON) => {
            let responseArticles = ArticleBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseArticles)
            })
        })
    }

    createArticle(article) {
        return this.#fetchAdv(this.#createArticleURL(article.getGroupId()), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            credentials:'include',
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
            credentials:'include',
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
            credentials:'include',
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

    getListEntriesByUserId(userId, includeArchived) {
        if (includeArchived == true) {
            return this.#fetchAdv(this.#getListEntriesIncludeArchivedByUserIdURL(userId)).then((responseJSON) => {
                let responseListEntry = ListEntryBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(responseListEntry)
                })
            })
        }
        else {
            return this.#fetchAdv(this.#getListEntriesByUserIdURL(userId)).then((responseJSON) => {
                let responseListEntry = ListEntryBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(responseListEntry)
                })
            })
        }        
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

    getListEntriesByGroupId(groupId) {
        return this.#fetchAdv(this.#getListEntriesByGroupIdURL(groupId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }

    getUpdatedListEntriesByTimePeriod(fromDate, toDate) {
        return this.#fetchAdv(this.#getUpdatedListEntriesByTimePeriodURL(fromDate, toDate)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }  

    getCheckedListEntriesByShoppingListId(shoppingListId) {
        return this.#fetchAdv(this.#getCheckedListEntriesByShoppingListIdURL(shoppingListId)).then((responseJSON) => {
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

    createListEntry(listentry) {
        return this.#fetchAdv(this.#createListEntryURL(listentry.getShoppingListId()), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            credentials:'include',
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
            credentials:'include',
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
            credentials:'include',
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

    getStandardArticlesByGroupId(groupId) {
        return this.#fetchAdv(this.#getStandardArticlesByGroupIdURL(groupId)).then((responseJSON) => {
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
            credentials:'include',
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

    deleteStandardArticleFromGroup(groupId, listentry) {
        return this.#fetchAdv(this.#deleteStandardArticleFromGroupURL(groupId, listentry.getId()), {
            method: 'DELETE',
            credentials:'include',
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
}
