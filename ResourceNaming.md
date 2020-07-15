# Resource Naming

## Einleitung
Für einen REST-Server/Service benötigen wir eine konsistente Bennenung aller Ressourcen.
Wir verwenden die folgende Ressourcen-Struktur, um mittels REST auf den 
Applikationsserver zuzugreifen.

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

Daraus ergeben sich folgende Ressourcen:
1. `ArticleListOperations` mit den Operationen C.1
2. `ArticleOperations` mit den Operationen C.2, C.5, C.6
3. `ArticlesByNameOperations`mit der Operation C.3
4. `GroupRelatedArticleOperations`mit der Operation C.4, C.7

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
8. Eine Shoopingliste in einer Gruppe erstellen
    ```
   FEHLT!!!!!!!
   ```

Daraus ergeben sich folgende Ressourcen:
1. `ShoppingListListOperations` mit den Operationen D.1
2. `ShoppingListOperations` mit den Operationen D.2, D.5, D.6
3. `ShoppingListsByNameOperations`mit der Operation D.3
4. `GroupRelatedShoppingListOperations`mit der Operation D.4, D.7

