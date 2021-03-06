# Resource Naming

## Einleitung
REST-Server/Services benötigen eine konsistente Bennenung aller Ressourcen.
Folgend wird die Ressourcen-Struktur aufgezeigt. Mittels REST kann dann auf den 
Applikationsserver zugegriffen werden.

## Festlegung Ressourcen-Präfix
Die gesamte Applikation benutzt konsistent den Ressourcen-Präfix `/app`.

## A) Zugriff auf `User`-Objekte

1. Alle User auslesen:
    ```
    GET /app/users
    ```
2. Einen User per ID auslesen:
    ```
    GET /app/user/{user_id}
    ```
3. User per Name auslesen:
    ```
    GET /app/users/by-name/{name}
    ```
4. Einen neuen User erstellen:
    ```
    POST /app/users
    ```
5. Einen bereits bestehenden User speichern (update):
    ```
    PUT /app/user/{user_id}
    ```
6. Einen User löschen:
    ```
    DELETE /app/user/{user_id}
    ```
7. Einen User per google_id auslesen
    ```
   GET /app/user/by-google-id/{google_id}
    ```
8. Alle Users einer Gruppe auslesen
    ```
   GET /app/group/{group_id}/users
    ```
Daraus ergeben sich folgende Ressourcen:
1. `UserListOperations` mit den Operationen A.1, A.4
2. `UserOperations` mit den Operationen A.2, A.5, A.6
3. `UserByNameOperations` mit der Operation A.3
4. `UserByGoogleIdOperation` mit der Operation A.7
5. `GroupRelatedUserOperations` mit der Operation A.8

## B) Zugriff auf `Group`-Objekte

1. Alle Gruppen des Systems auslesen:
    ```
    GET /app/groups
    ```
2. Eine Gruppe auslesen:
    ```
    GET /app/group/{group_id}
    ```
3. Alle Gruppen eines Users auslesen:
    ```
    GET /app/user/{user_id}/groups
    ```
4. User per Name auslesen:
    ```
   GET /app/groups/by-name/{name}
   ```
5. Eine neue Gruppe für einen User erstellen:
    ```
    POST /app/user/{user_id}/groups
    ```
6. Ein bereits bestehende Gruppe speichern:
    ```
    PUT /app/group/{group_id}
    ```
7. Eine Gruppe löschen:
    ```
    DELETE /app/group/{group_id}
    ```
8. Ein User in einer Gruppe adden:
    ```
   POST /app/group/{group_id}/user/{user_id}
   ```
9. Ein User von einer Gruppe löschen:
    ```
   DELETE /app/group/{group_id}/user/{user_id}
   ```

Daraus ergeben sich folgende Ressourcen:
1. `GroupListOperations` mit den Operationen B.1
2. `GroupOperations` mit den Operationen B.2, B.6, B.7
3. `UserRelatedGroupOperations` mit der Operation B.3, B.5
4. `GroupsByNameOperations` mit der Operation B.4
5. `GroupUserRelationOperations` mit der Operation B.8, B.9

## C) Zugriff auf `Article`-Objekte
1.  Alle Articles auslesen:
    ```
    GET /app/articles
    ```
2. Ein Article auslesen:
    ```
    GET /app//article/{article_id}
    ```
3. Ein Article per Name auslesen:
    ```
    GET /app/articles/by-name/{name}
    ```
4. Articles per Group_id auslesen:
    ```
    GET /app/group/{group_id}/articles
    ```
5. Ein bereits bestehendes Article speichern (update):
    ```
    PUT /app/article/{article_id}
    ```
6. Ein Article löschen:
    ```
    DELETE /app/article/{article_id}
    ```
7. Ein Article erstellen:
    ```
    POST /app/group/{group_id}/articles
    ```
8. Die oft benutzten Articles einer Groupe auslesen
    ```
    GET /app/group/{group_id}/articles/most-frequent
    ```
Daraus ergeben sich folgende Ressourcen:
1. `ArticleListOperations` mit den Operationen C.1
2. `ArticleOperations` mit den Operationen C.2, C.5, C.6
3. `ArticlesByNameOperations`mit der Operation C.3
4. `GroupRelatedArticleOperations`mit der Operation C.4, C.7
5. `GroupRelatedArticleFrequencyOperations`mit der Operation C.8

## D) Zugriff auf `Shoppinglist`-Objekte
1.  Alle Shoppinglisten auslesen:
    ```
    GET /app/shoppinglists
    ```
2. Eine Shoppinglist auslesen:
    ```
    GET /app/shoppinglist/{shopping_list_id}
    ```
3. Eine Shoppingliste per Name auslesen:
    ```
    GET /app/shoppinglists/by-name/{name}
    ```
4. Shoppinglisten per Group_id auslesen:
    ```
    GET /app/group/{group_id}/shoppinglists
    ```
5. Eine bereits bestehende Shoppingliste speichern:
    ```
    PUT /app/shoppinglist/{shopping_list_id}
    ```
6. Eine Shoppingliste löschen:
    ```
    DELETE /app/shoppinglist/{shopping_list_id}
    ```
7. Eine Shoopingliste erstellen:
    ```
    POST /app/group/{group_id}/shoppinglists
    ```
8. Alle archivierten Shoopinglisten auslesen:
    ```
    GET /app/shoppinglist/{shopping_list_id}/archive
    ```
9. Standardarticle einer Shoppingliste hinzufügen:
    ```
    POST /app/group/{group_id}/shoppinglists/{shopping_list_id}
    ```

Daraus ergeben sich folgende Ressourcen:
1. `ShoppingListListOperations` mit den Operationen D.1
2. `ShoppingListOperations` mit den Operationen D.2, D.5, D.6
3. `ShoppingListsByNameOperations`mit der Operation D.3
4. `GroupRelatedShoppingListOperations`mit der Operation D.4, D.7
5. `ShoppingListArchiveOperations` mit der Operation D.8
6. `GroupShoppingListStandardArticleRelationOperations` mit der Operation D.9

## E) Zugriff auf `Listentry`-Objekte
1.  Alle Listentries auslesen:
    ```
    GET /app/listentries
    ```
2. Eine Listentry auslesen:
    ```
    GET /app/listentry/{list_entry_id}
    ```
3. Eine Listentries per Shoppinglist_id auslesen:
    ```
    GET /app/shoppinglist/{shopping_list_id}/listentries
    ```
4. Checked Listentries per Shoppinglist_id auslesen:
    ```
    GET /app/shoppinglist/{shopping_list_id}/listentries
    ```
5. Listentries per User_id auslesen:
    ```
    GET /app/user/{user_id}/listentries
    ```
6. Listentries per Group_id auslesen:
    ```
    GET /app/group/{group_id}/listentries
    ```
7. Listentries per Article_id auslesen:
    ```
    GET /app/article/{article_id}/listentries
    ```
8. Listentries per Retailer_id auslesen:
    ```
    GET /app/retailer/{retailer_id}/listentries
    ```
9. Listentries die in einem bestimmten Zeitraum geupdaten wurden auslesen:
    ```
    GET /app/listentries/by-date/{from_date}/{to_date}
    ```
10. Ein bereits bestehendes Listentry speichern:
    ```
    PUT /app/listentry/{int:list_entry_id}
    ```
11. Ein Listentry löschen:
    ```
    DELETE /app/listentry/{int:list_entry_id}
    ```
12. Ein Standardarticle einer Gruppe löschen
    ```
    DELETE app/group/{group_id}/listentry/{list_entry_id}
    ```
13. Ein Listentry erstellen:
    ```
    POST /app/shoppinglist/{int:shopping_list_id}/listentries
    ```
14. Ein Standardarticle einer Gruppe hinzufügen:
    ```
    POST /app/group/{group_id}/listentry/{list_entry_id}
    ```
15. Alle Listentries eines bestimmten Users auslesen, Archive included:
    ```
    GET /app/user/{user_id}/listentries/include-archive
    ```
16. Alle Standardarticles einer bestimmten Gruppe auslesen:
    ```
    GET /app/group/{group_id}/standardarticles
    ```
17. Alle Standardarticles einer bestimmten Gruppe hinzufügen:
    ```
    POST /app/group/{group_id}/shoppinglist/{shopping_list_id}
    ```
    
Daraus ergeben sich folgende Ressourcen:
1. `ListEntryListOperations` mit den Operationen E.1
2. `ListEntryOperations` mit den Operationen E.2, E.10, E.11
3. `UserRelatedListEntryOperations` mit der Operation E.5
4. `GroupRelatedListEntryOperations` mit der Operation E.6,
5. `ArticleRelatedListEntriesOperations` mit der Operation E.7
6. `ShoppingListRelatedCheckedByListEntryOperations` mit der Operation E.4
7. `ShoppingListRelatedListEntryListOperations` mit der Operation E.3, E.13
8. `RetailerRelatedListEntryOperations` mit der Operation E.8
9. `GroupListEntryStandardArticleRelationOperations` mit der Operation E.12, E.14
10. `ListEntryDateTimeRelationOperations` mit der Operation E.9
11. `UserRelatedAllListEntryOperations` mit der Operation E.15
12. `GroupRelatedStandardarticleOperations` mit der Operation E.16,
13. `GroupShoppingListStandardArticleRelationOperations` mit der Operation E.17

## F) Zugriff auf `Retailer`-Objekte

1. Alle Retailer auslesen:
    ```
    GET /app​/retailers
    ```
2. Einen Retailer per ID auslesen:
    ```
    GET /app/retailer/{retailer_id}
    ```
3. Retailer per Name auslesen:
    ```
    GET /app/retailer/by-name/{name}
    ```
4. Die oft benutzten Retailer des Users auslesen
    ```
    Get /app/user/{user_id}/retailers/most-frequent
    ```

Daraus ergeben sich folgende Ressourcen:
1. `RetailerListOperations` mit den Operationen F.1
2. `RetailerOperations` mit den Operationen F.2
3. `RetailerByNameOperations` mit der Operation F.3
4. `UserRelatedRetailerFrequencyOperations` mit der Operation F.4

## Hinweise
**POST** wird verwendet, wenn *neue* Objekte angelegt werden sollen.

**PUT** wird für ein Update von *bereits bestehenden* Objekten verwendet.

