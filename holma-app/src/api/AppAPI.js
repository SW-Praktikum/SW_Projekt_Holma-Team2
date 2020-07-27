import ArticleBO from './ArticleBO';
import GroupBO from './GroupBO';
import ListEntryBO from './ListEntryBO';
import RetailerBO from './RetailerBO';
import ShoppingListBO from './ShoppingListBO';
import UserBO from './UserBO';

export default class AppAPI {

    static #api = null;

    //Local Python Backend
    #appServerBaseURL = 'http://localhost:5000/app';
    
    // Remote Backend:
    //#appServerBaseURL = 'http://backend.holma.xyz/app';



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
    #getArticlesFrequencyByGroupIdURL = (groupId) => `${this.#appServerBaseURL}/group/${groupId}/articles/most-frequent`;

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
    #getFrequentRetailerByUserIdURL = (userId) => `${this.#appServerBaseURL}/user/${userId}/retailers/most-frequent`;

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
                throw Error(`${response.status} ${response.statusText}`)
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
                'Content-type': 'application/json'
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

   // Updates an User and returns a Promise, which resolves to a UserBO.
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

    // Deletes an User  
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

    //Returns a Promise, which resolves to an Array of defined UserBOs
    getUserById(userId) {
        return this.#fetchAdv(this.#getUserByIdURL(userId)).then((responseJSON) => {
            let responseUser = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseUser)
            })
        })
    };

    //Returns a Promise, which resolves to an Array of defined UserBOs
    getUserByGoogleId(googleId) {
        return this.#fetchAdv(this.#getUserByGoogleIdURL(googleId)).then((responseJSON) => {
            let responseUser = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseUser)
            })
        })
    };

    //Returns a Promise, which resolves to an Array of defined by name UserBOs
    getUsersByName(name) {
        return this.#fetchAdv(this.#getUsersByNameURL(name)).then((responseJSON) => {
            let responseUsers = UserBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseUsers)
            })
        })
    };

    //Adds a User to a Group and returns a Promise
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

    //Removes a User from a Group and returns a Promise
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
    
    //Returns a Promise, which resolves to an Array of defined by userId GroupBOs
    getGroupsByUserId(userId) {
        return this.#fetchAdv(this.#getGroupsByUserIdURL(userId), {credentials:'include'}).then((responseJSON) => {
            let responseGroups = GroupBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseGroups)
            })
        })
    };

    //Adds a Group and returns a Promise, which resolves to a new GroupBO object with it's defined attributes
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

    //Returns a Promise, which resolves to an Array of GroupBOs
    getGroups() {
        return this.#fetchAdv(this.#getGroupsURL()).then((responseJSON) => {
            let responseGroups = GroupBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseGroups)
            })
        })
    };

    //Returns a Promise, which resolves to an Array of defined GroupBOs
    getGroupById(groupId) {
        return this.#fetchAdv(this.#getGroupByIdURL(groupId)).then((responseJSON) => {
            let responseGroups = GroupBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGroups)
            })
        })
    };

    //Returns a Promise, which resolves to an Array of defined GroupBOs
    getGroupsByName(name) {
        return this.#fetchAdv(this.#getGroupsByNameURL(name)).then((responseJSON) => {
            let responseGroups = GroupBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseGroups)
            })
        })
    };

   // Updates a Group and returns a Promise, which resolves to a GroupBO.    
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

    // Deletes a Group  
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

    //Returns a Promise, which resolves to an Array of defined by groupId UserBOs
    getUsersByGroupId(groupId) {
        return this.#fetchAdv(this.#getUsersByGroupIdURL(groupId)).then((responseJSON) => {
            let responseUsers = UserBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseUsers)
            })
        })
    }

    //Returns a Promise, which resolves to an Array of defined by groupId ShoppingListBOs
    getShoppingListsByGroupId(groupId) {
        return this.#fetchAdv(this.#getShoppingListsByGroupIdURL(groupId)).then((responseJSON) => {
            let responseShoppingLists = ShoppingListBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseShoppingLists)
            })
        })
    }

    //Returns a Promise, which resolves to an Array of defined ShoppingListBOs
    getShoppingListById(shoppingListId) {
        return this.#fetchAdv(this.#getShoppingListByIdURL(shoppingListId)).then((responseJSON) => {
            let responseShoppingLists = ShoppingListBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseShoppingLists)
            })
        })
    }

    //Creates a Shoppinglist and returns a Promise, which resolves to a new ShoppingListBO object with it's defined attributes
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

   // Updates a ShoppingList and returns a Promise, which resolves to a ShoppinglistBO.    
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

    // Deletes a Shoppinglist  
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
    //Returns a Promise, which resolves to an Array of archived ShoppingListBOs
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

    //Returns a Promise, which resolves to an Array of ArticleBOs
    getArticles() {
        return this.#fetchAdv(this.#getArticlesURL()).then((responseJSON) => {
            let responseArticles = ArticleBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseArticles)
            })
        })
    };

    //Returns a Promise, which resolves to an Array of defined by GroupId ArticleBOs
    getArticlesByGroupId(groupId) {
        return this.#fetchAdv(this.#getArticlesByGroupIdURL(groupId)).then((responseJSON) => {
            let responseArticles = ArticleBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseArticles)
            })
        })
    }

    //Adds an Article and returns a Promise, which resolves to a new ArticleBO object with it's defined attributes
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

    //Returns a Promise, which resolves to an Array of defined by Name ArticleBOs
    getArticlesByName(name) {
        return this.#fetchAdv(this.#getArticlesByNameURL(name)).then((responseJSON) => {
            let responseArticles = ArticleBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseArticles)
            })
        })
    };

   // Updates an Article and returns a Promise, which resolves to an ArticleBO.    
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

    // Deletes an Article  
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

    //Returns a Promise, which resolves to an Array of defined ArticleBO
    getArticleById(articleId) {
        return this.#fetchAdv(this.#getArticleByIdURL(articleId)).then((responseJSON) => {
            let responseArticle = ArticleBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseArticle)
            })
        })
    };

    //Returns a Promise, which resolves to an Array of defined ListEntryBOs
    getListEntriesByUserId(userId, includeArchived) {
        if (includeArchived == true) {
            return this.#fetchAdv(this.#getListEntriesIncludeArchivedByUserIdURL(userId)).then((responseJSON) => {
                let responseListEntries = ListEntryBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(responseListEntries)
                })
            })
        }
        else {
            return this.#fetchAdv(this.#getListEntriesByUserIdURL(userId)).then((responseJSON) => {
                let responseListEntries = ListEntryBO.fromJSON(responseJSON);
                return new Promise(function async (resolve) {
                    resolve(responseListEntries)
                })                
            })
        }        
    }; 

    async completeListEntry(listEntry) {
        if (listEntry.getArticleId() !== null) {
            let article = await this.getArticleById(listEntry.getArticleId())
            listEntry.article = article
        } else {
            listEntry.article = new ArticleBO("", 0)
        }
        
        if (listEntry.getRetailerId() !== null) {
            let retailer = await this.getRetailerById(listEntry.getRetailerId())
            listEntry.retailer = retailer    
        } else {
            listEntry.retailer = new RetailerBO("")
        }

        if (listEntry.getPurchasingUserId() !== null) {
            let purchasingUser = await this.getUserById(listEntry.getPurchasingUserId())
            listEntry.purchasingUser = purchasingUser
        } else {
            listEntry.purchasingUser = new UserBO("", "", "")
        }

        if (listEntry.getShoppingListId() !== null) {
            let shoppingList = await this.getShoppingListById(listEntry.getShoppingListId())
            listEntry.shoppingList = shoppingList    
        } else {
            listEntry.shoppingList = new ShoppingListBO("", 0, "")
        }

        return new Promise(function (resolve) {
            resolve(listEntry)
        })    }

    //Returns a Promise, which resolves to an Array of defined by articleId ListEntryBOs
    getListEntriesByArticleId(articleId) {
        return this.#fetchAdv(this.#getListEntriesByArticleIdURL(articleId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    } 

    //Returns a Promise, which resolves to an Array of defined shoppinglistId ListEntryBOs
     getListEntriesByShoppingListId(shoppingListId) {
        return this.#fetchAdv(this.#getListEntriesByShoppingListIdURL(shoppingListId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }

    //Returns a Promise, which resolves to an Array of defined by groupId ListEntryBOs
    getListEntriesByGroupId(groupId) {
        return this.#fetchAdv(this.#getListEntriesByGroupIdURL(groupId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }

    //Returns a Promise, which resolves to an Array of defined by Time Period ListEntryBOs
    getUpdatedListEntriesByTimePeriod(fromDate, toDate) {
        return this.#fetchAdv(this.#getUpdatedListEntriesByTimePeriodURL(fromDate, toDate)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }  

    //Returns a Promise, which resolves to an Array of defined ListEntryBOs
    getCheckedListEntriesByShoppingListId(shoppingListId) {
        return this.#fetchAdv(this.#getCheckedListEntriesByShoppingListIdURL(shoppingListId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }  

    //Returns a Promise, which resolves to an Array of defined by retailerId ListEntryBOs
     getListEntriesByRetailerId(retailerId) {
        return this.#fetchAdv(this.#getListEntriesByRetailerIdURL(retailerId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }; 

    //Returns a Promise, which resolves to an Array of a defined ListEntryBO
    getListEntryById(listEntryId) {
        return this.#fetchAdv(this.#getListEntryByIdURL(listEntryId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    } 

    //Returns a Promise, which resolves to an Array of ListEntryBOs
    getListEntries() {
        return this.#fetchAdv(this.#getListEntryURL()).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    };

    //Adds a ListEntry and returns a Promise, which resolves to a new ListEntryBO object with it's defined attributes
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

   // Updates a ListEntry and returns a Promise, which resolves to a ListEntryBO.    
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

    // Deletes a ListEntry
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

    //Returns a Promise, which resolves to an Array of RetailerBOs
    getRetailers() {
        return this.#fetchAdv(this.#getRetailersURL()).then((responseJSON) => {
            let responseRetailer = RetailerBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseRetailer)
            })
        })
    };

    //Returns a Promise, which resolves to an Array of a defined RetailerBO
    getRetailerById(retailerId) {
        return this.#fetchAdv(this.#getRetailerByIdURL(retailerId)).then((responseJSON) => {
            let responseRetailer = RetailerBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseRetailer)
            })
        })
    }

    //Returns a Promise, which resolves to an Array of defined by name RetailerBOs
    getRetailersByName(name) {
        return this.#fetchAdv(this.#getRetailersByNameURL(name)).then((responseJSON) => {
            let responseRetailer = RetailerBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseRetailer)
            })
        })
    };

    //Returns a Promise, which resolves to an Array of defined by groupId ListEntryBOs
    getStandardArticlesByGroupId(groupId) {
        return this.#fetchAdv(this.#getStandardArticlesByGroupIdURL(groupId)).then((responseJSON) => {
            let responseListEntry = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseListEntry)
            })
        })
    }

    //adds a Standardarticle to a Group and returns a Promise
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

    //adds a Standardarticle to a ShoppingList and returns a Promise
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

    //Removes a Standardarticle from a Group and returns a Promise
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

    //Returns a Promise, which resolves to an Array of most used RetailerBOs
    getFrequentRetailerByUserId(userId) {
        return this.#fetchAdv(this.#getFrequentRetailerByUserIdURL(userId)).then((responseJSON) => {
            let responseRetailer = RetailerBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseRetailer)
            })
        })
    }  

    //Returns a Promise, which resolves to an Array of most used ArticleBOs
    getArticlesFrequencyByGroupId(groupId) {
        return this.#fetchAdv(this.#getArticlesFrequencyByGroupIdURL(groupId)).then((responseJSON) => {
            let responseArticle = ArticleBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseArticle)
            })
        })
    }


}
