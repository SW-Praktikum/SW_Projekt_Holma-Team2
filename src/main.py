# Unser Service basiert auf Flask
from flask import Flask
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS
# Wir nutzen RestX das auf Flask aufbaut
from flask_restx import Api, Resource, fields

# Wir greifen auf unsere BusinessObjects und Applikationslogik
from ListAdministration import Administration
from ListAdministration import StatisticAdministration
from bo.Article import Article
from bo.Group import Group
from bo.ShoppingList import ShoppingList
from bo.User import User
from bo.ListEntry import ListEntry
from bo.Retailer import Retailer

"""Hier wird Flask instanziert"""
app = Flask(__name__)

"""Flask-Erweiterung für Cross-Origin Resource Sharing"""
CORS(app, resources=r'/app/*')

api = Api(app, version='1.0', title='HOLMA API',
          description='Eine rudimentäre Demo-API für Listenerstellung.')

"""Namespaces"""
holmaApp = api.namespace('app', description="Funktionen der App")

"""Hier wird definiert wie die Businessobjects beim Marshelling definiert 
werden sollen in der JSON"""
bo = api.model('BusinessObject', {
    'name': fields.String(attribute='_name', description='Name eines Objekts'),
    'id': fields.Integer(attribute='_id',
                         description='Der Unique Identifier '
                                     'eines Business Object'),
    'creationDate': fields.DateTime(attribute='_creation_date',
                                description='Erstellungsdatum des BOs, wird '
                                            'durch Unix Time Stamp ermittlet',
                                    dt_format="iso8601"),
    'lastUpdated': fields.DateTime(attribute='_last_updated',
                                   description='Änderungsdatum des BOs, wird durch'
                                           'Unix Time Stamp ermittlet',
                                    dt_format="iso8601")
})

user = api.inherit('User', bo, {
    'email': fields.String(attribute='_email',
                           description='E-Mail-Adresse eines Benutzers'),
    'googleId': fields.String(attribute='_google_id',
                              description='google id eines Benutzers'),
})

group = api.inherit('Group', bo, {
    'owner': fields.Integer(attribute='_owner',
                            description='Unique Id des Gruppeninhabers'),
})

shoppingList = api.inherit('ShoppingList', bo, {

    'groupId': fields.Integer(attribute='_group_id',
                              description='ID der Gruppe zu der diese Liste gehört')
})

listEntry = api.inherit('ListEntry', bo, {
    'articleId': fields.Integer(attribute='_article',
                                 description='zu welchem Artikel gehört dieses Entry? '),
    'articleName': fields.String(attribute='_article_name',
                                 description='zu welchem Artikel gehört dieses Entry? '),
    'amount': fields.Float(attribute='_amount',
                           description='Menge des Entries '),
    'unit': fields.String(attribute='_unit',
                          description='Einheit des Entries '),
    'purchasingUserId': fields.Integer(attribute='_purchasing_user',
                                    description='Wer das Artikle kaufen muss '),
    'purchasingUserName': fields.String(attribute='_purchasing_user_name',
                                    description='Wer das Artikle kaufen muss '),
    'shoppingListId': fields.Integer(attribute='_shopping_list',
                                   description='zu welcher Liste diese Entry gehört?'),
    'shoppingListName': fields.String(attribute='_shopping_list_name',
                                   description='zu welcher Liste diese Entry gehört?'),
    'retailerId': fields.Integer(attribute='_retailer',
                              description='Bei wem das Artikle gekauft  '),
    'retailerName': fields.String(attribute='_retailer_name',
                              description='Bei wem das Artikle gekauft  '),
    'checked': fields.Boolean(attribute='_checked',
                              description='wurde es bereits gekauft'),
    'checkedTs': fields.DateTime(attribute='_checked_ts',
                                 description='wann wurde es gekauft',
                                 dt_format="iso8601"),
    'standardarticle': fields.Boolean(attribute='_standardarticle',
                                      description='ist es ein Standardartikle')
})

article = api.inherit('Article', bo, {
    'groupId': fields.Integer(attribute='_group_id',
                               description='zu welcher Groupe dieses Artikle gehört?')

})

retailer = api.inherit('Retailer', bo)


@holmaApp.route('/users')
@holmaApp.response(500, 'Falls es zu einem Server -seitigen Fehler kommt')
class UserListOperations(Resource):
    @holmaApp.marshal_list_with(user)
    # @secured
    def get(self):
        """Auslesen aller User-Objekte.

                Sollten keine User-Objekte verfügbar sein,
                so wird eine leere Sequenz zurückgegeben."""
        adm = Administration()
        user_list = adm.get_all_users()
        return user_list

    @holmaApp.marshal_with(user, code=200)
    @holmaApp.expect(user)  # Wir erwarten ein USer-Objekt von Client-Seite.
    # @secured
    def post(self):
        """Anlegen eines neuen User-Objekts."""
        adm = Administration()
        proposal = User.from_dict(api.payload)
        if proposal is not None:
            """ Wir verwenden Namen, email und google_Id des Proposals für
             die Erzeugung eines User-Objekts. Das serverseitig erzeugte 
             Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. """
            usr = adm.create_user(proposal.get_name(), proposal.get_email(),
                                  proposal.get_google_id())
            return usr, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und
            # werfen einen Server-Fehler.
            return '', 500


@holmaApp.route('/user/<int:user_id>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('user_id', 'Die ID des User-Objekts')
class UserOperations(Resource):
    @holmaApp.marshal_with(user)
    # @secured
    def get(self, user_id):
        """Auslesen eines bestimmten User-Objekts.

        Das auszulesende Objekt wird durch die user_id in dem URI bestimmt.
                """
        adm = Administration()
        usr = adm.get_user_by_id(user_id)
        return usr

    # @secured
    def delete(self, user_id):
        """Löschen eines bestimmten User-Objekts.

         Das zu löschende Objekt wird durch die user_id in dem URI bestimmt.
               """
        adm = Administration()
        usr = adm.get_user_by_id(user_id)
        if usr is not None:
            adm.delete_user(usr)
            return 'deleted', 200
        else:
            return '', 500

    @holmaApp.marshal_with(user)
    @holmaApp.expect(user, validate=True)
    # @secured
    def put(self, user_id):
        """Update eines bestimmten User-Objekts."""
        adm = Administration()
        usr = User.from_dict(api.payload)

        if usr is not None:
            usr.set_id(user_id)
            adm.save_user(usr)
            return '', 200
        else:
            return '', 500


@holmaApp.route('/user/by-google-id/<string:google_id>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('google_id', 'Die ID des User-Objekts')
class UserByGoogleIdOperation(Resource):
    @holmaApp.marshal_with(user)
    # @secured
    def get(self, google_id):
        """Auslesen eines bestimmten User-Objekts.

        Das auszulesende Objekt wird durch die google_id in dem URI bestimmt.
                       """
        adm = Administration()
        usr = adm.get_user_by_google_id(google_id)
        return usr


@holmaApp.route('/users/by-name/<string:name>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('name', 'Der Name des Users')
class UserByNameOperations(Resource):
    @holmaApp.marshal_with(user)
    # @secured
    def get(self, name):
        """ Auslesen von User-Objekten, die durch den Namen bestimmt werden.

    Die auszulesenden Objekte werden durch name in dem URI bestimmt.
               """
        adm = Administration()
        us = adm.get_user_by_name(name)
        return us


@holmaApp.route('/group/<int:group_id>/users')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('group_id', 'Die ID des Group-Objekts')
class GroupRelatedUserOperations(Resource):
    @holmaApp.marshal_with(user)
    # @secured
    def get(self, group_id):
        """Auslesen aller User-Objekte einer bestimmten Groupe.

                        Sollten keine Group-Objekte verfügbar sein,
                        so wird eine leere Sequenz zurückgegeben."""
        # objekt nicht benötigt, nur group ID
        adm = Administration()
        grp = adm.get_group_by_id(group_id)

        if grp is not None:
            user_list = adm.get_members_by_group_id(group_id)
            return user_list
        else:
            return "Group not found", 500


@holmaApp.route('/groups')
@holmaApp.response(500, 'Falls es zu einem Server-seitigem Fehler kommt.')
class GroupListOperations(Resource):
    @holmaApp.marshal_list_with(group)
    # @secured
    def get(self):
        """Auslesen aller Group-Objekte.

    Sollten keine Group-Objekte verfügbar sein, so wird eine
    leere Sequenz zurückgegeben."""
        adm = Administration()
        group_list = adm.get_all_groups()
        return group_list


@holmaApp.route('/group/<int:group_id>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('group_id', 'Die ID des Group-Objekts')
class GroupOperations(Resource):
    @holmaApp.marshal_with(group)
    # @secured
    def get(self, group_id):
        """Auslesen eines bestimmten Group-Objekts.

    Das auszulesende Objekt wird durch die group_id in dem URI bestimmt.
               """
        adm = Administration()
        grp = adm.get_group_by_id(group_id)
        return grp

    # @secured
    def delete(self, group_id):
        """Löschen eines bestimmten Group-Objekts.

           Das auszulesende Objekt wird durch die group_id in dem URI bestimmt.
               """
        adm = Administration()
        grp = adm.get_group_by_id(group_id)
        if grp is not None:
            adm.delete_group(grp)
            return 'deleted', 200
        else:
            return '', 500

    @holmaApp.marshal_with(group)
    @holmaApp.expect(group)#, validate=True)
    # @secured
    def put(self, group_id):
        """Update eines bestimmten Group-Objekts."""
        adm = Administration()
        grp = Group.from_dict(api.payload)

        if grp is not None:
            grp.set_id(group_id)
            adm.save_group(grp)
            return '', 200
        else:
            return '', 500


@holmaApp.route('/groups/by-name/<string:name>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('name', 'Der Name der Gruppe')
class GroupsByNameOperations(Resource):
    @holmaApp.marshal_with(group)
    # @secured
    def get(self, name):
        """ Auslesen von Group-Objekten, die durch den Namen bestimmt werden

     Die auszulesenden Objekte werden durch name in dem URI bestimmt.
                """
        adm = Administration()
        us = adm.get_groups_by_name(name)
        return us


@holmaApp.route('/user/<int:user_id>/groups')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('user_id', 'Die ID des User-Objekts')
class UserRelatedGroupOperations(Resource):
    @holmaApp.marshal_with(group)
    # @secured
    def get(self, user_id):
        """Auslesen aller Group-Objekts eines bestimmten Users
                      """
        adm = Administration()
        us = adm.get_user_by_id(user_id)

        if us is not None:
            group_list = adm.get_groups_by_user_id(user_id)
            return group_list
        else:
            return "User not found", 500

    @holmaApp.marshal_with(group, code=201)
    # @secured
    def post(self, user_id):
        """ Wir verwenden Namen und user_id des Proposals für
                die Erzeugung eines Group-Objekts. Das serverseitig erzeugte
                     Objekt ist das maßgebliche und
                    wird auch dem Client zurückgegeben. """
        adm = Administration()
        us = adm.get_user_by_id(user_id)
        proposal = Group.from_dict(api.payload)

        if us is not None and proposal is not None:
            result = adm.create_group(proposal.get_name(), user_id)
            return result
        else:
            return "User unkown or payload not valid", 500


@holmaApp.route('/group/<int:group_id>/user/<int:user_id>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('group_id', 'Die ID des Group-Objekts')
@holmaApp.param('user_id', 'Die ID des User-Objekts')
class GroupUserRelationOperations(Resource):
    @holmaApp.marshal_with(user)
    @holmaApp.marshal_with(group)
    # @secured
    def post(self, group_id, user_id):
        """Füge ein bestimmten User Objekt einer bestimmten Groupe hinzu"""
        adm = Administration()
        grp = adm.get_group_by_id(group_id)
        us = adm.get_user_by_id(user_id)

        if grp is not None and us is not None:
            result = adm.add_member_to_group(grp, us)
            return result
        else:
            return "Group or User not found", 500

    def delete(self, group_id, user_id):
        """Lösch ein bestimmten User Objekt von einer bestimmten Groupe"""
        adm = Administration()
        grp = adm.get_group_by_id(group_id)
        us = adm.get_user_by_id(user_id)

        if grp is not None and us is not None:
            result = adm.remove_member_from_group(grp, us)
            return result
        else:
            return "Group or User not found", 500


# Neu

@holmaApp.route('/articles')
@holmaApp.response(500, 'Falls es zu einem Server-seitigem Fehler kommt.')
class ArticleListOperations(Resource):

    @holmaApp.marshal_list_with(article)
    # @secured
    def get(self):
        """Auslesen aller article-Objekte.

                        Sollten keine Article-Objekte verfügbar sein,
                        so wird eine leere Sequenz zurückgegeben."""
        adm = StatisticAdministration()
        art_list = adm.get_all_articles()
        return art_list


@holmaApp.route('/article/<int:article_id>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('article_id', 'Die ID des article-Objekts')
class ArticleOperations(Resource):
    @holmaApp.marshal_list_with(article)
    # @secured
    def get(self, article_id):
        """Auslesen eines bestimmten Article-Objekts.

        Das auszulesende Objekt wird durch die article_id in dem URI bestimmt.
                        """
        adm = Administration()
        art = adm.get_article_by_id(article_id)
        return art

    # @secured
    def delete(self, article_id):
        """Löschen eines bestimmten Article-Objekts.

        Das zu löschende Objekt wird durch die article_id in dem URI bestimmt.
                      """
        adm = Administration()
        adm.delete_article(article_id)
        return 'deleted', 200

    @holmaApp.marshal_with(article)
    @holmaApp.expect(article) #validate=True)
    # @secured
    def put(self, article_id):
        """Update eines bestimmten article-Objekts."""
        adm = Administration()
        art = Article.from_dict(api.payload)

        if art is not None:
            art.set_id(article_id)
            adm.save_article(art)
            return '', 200
        else:
            return '', 500


@holmaApp.route('/articles/by-name/<string:name>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('name', 'Der Name des Articles')
class ArticlesByNameOperations(Resource):
    @holmaApp.marshal_list_with(article)
    # @secured
    def get(self, name):
        """ Auslesen von Article-Objekten, die durch den Namen bestimmt werden.

           Die auszulesenden Objekte werden durch name in dem URI bestimmt.
                      """
        adm = Administration()
        us = adm.get_article_by_name(name)
        return us


@holmaApp.route('/group/<int:group_id>/articles')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('group_id', 'Die ID des person-Objekts')
class GroupRelatedArticleOperations(Resource):
    @holmaApp.marshal_with(article)
    # @secured
    def get(self, group_id):
        """Auslesen aller Article-Objekte einer bestimmten Gruppe.

           Sollten keine Article-Objekte verfügbar sein, so wird eine
           leere Sequenz zurückgegeben."""
        adm = Administration()
        grp = adm.get_group_by_id(group_id)

        if grp is not None:
            # Jetzt erst lesen wir die Konten des Customer aus.
            articles_list = adm.get_articles_by_group_id(grp.get_id())
            return articles_list
        else:
            return "No articles found", 500

    @holmaApp.marshal_with(article, code=201)
    # @secured
    def post(self, group_id):
        """Anlegen eines neuen Article-Objekts."""
        adm = Administration()
        art = adm.get_group_by_id(group_id)

        proposal = Article.from_dict(api.payload)

        if art is not None and proposal is not None:
            result = adm.create_article(proposal.get_name(), group_id)
            return result
        else:
            return "Group unkown or payload not valid", 500


@holmaApp.route('/group/<int:group_id>/shoppinglists')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('group_id', 'Die ID des group-Objekts')
class GroupRelatedShoppingListOperations(Resource):
    @holmaApp.marshal_with(shoppingList)
    # @ secured
    def get(self, group_id):
        """Auslesen eines neuen Shoppinglist-Objekts die zu einer bestimmten
        Groupe gehören."""
        adm = Administration()
        sl = adm.get_group_by_id(group_id)
        if sl is not None:
            shoppinglists_list = adm.get_shopping_lists_by_group_id(sl)
            return shoppinglists_list
        else:
            return "Group not found", 500

    @holmaApp.marshal_with(shoppingList, code=201)
    # @ secured
    def post(self, group_id):
        """Anlegen eines neuen Shoppinglist-Objekts die zu einer bestimmten
        Groupe gehören wird."""
        adm = Administration()
        sl = adm.get_group_by_id(group_id)
        proposal = ShoppingList.from_dict(api.payload)

        if sl is not None and proposal is not None:
            result = adm.create_shopping_list(proposal.get_name(), group_id)
            return result
        else:
            return "Group unkown or payload not valid", 500


@holmaApp.route('/shoppinglist/<int:shopping_list_id>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('shoppinglist_id', 'Die ID des Shopping-List-Objekts')
class ShoppingListOperations(Resource):
    @holmaApp.marshal_with(shoppingList)
    # @secured
    def get(self, shopping_list_id):
        """Auslesen einer bestimmten Shoppinglist-Objekt."""
        adm = Administration()
        sl = adm.get_shopping_list_by_id(shopping_list_id)
        return sl

    # @secured
    def delete(self, shopping_list_id):
        """Löschen einer bestimmten Shoppinglist-Objekt.

            Das zu löschende Objekt wird durch die user_id in dem URI bestimmt.
                       """
        adm = Administration()
        sl = adm.get_shopping_list_by_id(shopping_list_id)
        if sl is not None:
            adm.delete_shopping_list(sl)
            return 'deleted', 200
        else:
            return '', 500

    @holmaApp.marshal_with(shoppingList)
    @holmaApp.expect(shoppingList, validate=True)
    # @secured
    def put(self, shopping_list_id):
        """Update eines bestimmten ShoppingList-Objekts."""
        adm = Administration()
        sl = ShoppingList.from_dict(api.payload)

        if sl is not None:
            sl.set_id(shopping_list_id)
            adm.save_shopping_list(sl)
            return '', 200
        else:
            return '', 500


@holmaApp.route('/shoppinglists')
@holmaApp.response(500, 'Falls es zu einem Server-seitigem Fehler kommt.')
class ShoppingListListOperations(Resource):
    @holmaApp.marshal_list_with(shoppingList)
    # @secured
    def get(self):
        adm = StatisticAdministration()
        sl_list = adm.get_all_shoppinlists()
        return sl_list


@holmaApp.route('/shoppinglists/by-name/<string:name>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('name', 'Der Name der Shoppinglist')
class ShoppingListsByNameOperations(Resource):
    @holmaApp.marshal_list_with(shoppingList)
    # @secured
    def get(self, name):
        adm = Administration()
        le = adm.get_shopping_list_by_name(name)
        return le


@holmaApp.route('/group/<int:group_id>/shoppinglist/<int:shopping_list_id>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('group_id', 'Die ID des Group-Objekts')
@holmaApp.param('shopping_list_id', 'Die ID des Shoppinglist-Objekts')
class GroupShoppingListStandardArticleRelationOperations(Resource):
    @holmaApp.marshal_with(shoppingList)
    @holmaApp.marshal_with(group)
    # @secured
    def post(self, group_id, shopping_list_id):
        adm = Administration()
        grp = adm.get_group_by_id(group_id)
        sl = adm.get_shopping_list_by_id(shopping_list_id)

        if grp is not None and sl is not None:
            result = adm.add_standardarticle_to_shopping_list(sl, grp)
            return result
        else:
            return "Group or ShoppingList not found", 500


@holmaApp.route('/shoppinglist/<int:shopping_list_id>/listentries')
@holmaApp.response(500, 'Falls es zu einem Server -seitigen Fehler kommt')
class ShoppingListRelatedListEntryListOperations(Resource):
    @holmaApp.marshal_list_with(listEntry)
    # @secured
    def get(self, shopping_list_id):
        adm = Administration()
        le = adm.get_shopping_list_by_id(shopping_list_id)
        if le is not None:
            listentry_list = adm.get_list_entries_by_shopping_list_id(le)
            return listentry_list
        else:
            return "ShoppingList not found", 500

    @holmaApp.marshal_with(listEntry, code=200)
    @holmaApp.expect(
        listEntry)  # Wir erwarten ein User-Objekt von Client-Seite.
    # @secured
    def post(self, shopping_list_id):
        adm = Administration()
        sl = adm.get_shopping_list_by_id(shopping_list_id)
        proposal = ListEntry.from_dict(api.payload)
        if sl is not None and proposal is not None:
            result = adm.create_list_entry(
                proposal.get_name(),
                proposal.get_amount(),
                proposal.get_article(),
                proposal.get_unit(),
                proposal.get_purchasing_user(),
                proposal.get_retailer(),
                proposal.get_shopping_list()
            )
            return result, 200
        else:
            return 'ShoppingList unknown or payload not valid', 500


@holmaApp.route('/listentries')
@holmaApp.response(500, 'Falls es zu einem Server-seitigem Fehler kommt.')
class ListEntryListOperations(Resource):
    @holmaApp.marshal_list_with(listEntry)
    # @secured
    def get(self):
        adm = StatisticAdministration()
        le_list = adm.get_all_list_entries()
        return le_list


@holmaApp.route('/listentry/<int:list_entry_id>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('list_entry_id', 'Die ID des ListEntry-Objekts')
class ListEntryOperations(Resource):
    @holmaApp.marshal_with(listEntry)
    # @secured
    def get(self, list_entry_id):

        adm = Administration()
        le = adm.get_list_entry_by_id(list_entry_id)
        return le

    # @secured
    def delete(self, list_entry_id):

        adm = Administration()
        le = adm.get_list_entry_by_id(list_entry_id)
        if le is not None:
            adm.delete_list_entry(le)
            return 'deleted', 200
        else:
            return 'ListEntry not found', 500

    @holmaApp.marshal_with(listEntry)
    @holmaApp.expect(listEntry)#, validate=True)
    # @secured
    def put(self, list_entry_id):
        adm = Administration()
        le = ListEntry.from_dict(api.payload)

        if le is not None:
            le.set_id(list_entry_id)
            adm.save_list_entry(le)
            return '', 200
        else:
            return '', 500


@holmaApp.route('/user/<int:user_id>/listentries')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('user_id', 'Die ID des user-Objekts')
class UserRelatedListEntryOperations(Resource):
    @holmaApp.marshal_with(listEntry)
    # @ secured
    def get(self, user_id):
        """Auslesen von Listentry-Objekten die zu einem bestimmten
        User gehören."""
        adm = Administration()
        us = adm.get_user_by_id(user_id)
        if us is not None:
            listentry_list = adm.get_list_entries_by_user_id(user_id)
            return listentry_list
        else:
            return "User not found", 500


@holmaApp.route('/shoppinglist/<int:shopping_list_id>/listentries')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('shoppinglist_id', 'Die ID des Shopping-Lis-Objekts')
class ShoppingListRelatedCheckedByListEntryOperations(Resource):
    @holmaApp.marshal_with(listEntry)
    # @ secured
    def get(self, shopping_list_id):
        """Auslesen von Listentry-Objekten die bereits gecheckt wurden """
        adm = Administration()
        sl = adm.get_shopping_list_by_id(shopping_list_id)
        if sl is not None:
            listentry_list = adm.get_list_entries_by_user_id(shopping_list_id)
            return listentry_list
        else:
            return "Shopping List not found", 500


@holmaApp.route('/listentries/by-date/<string:from_date>/<string:to_date>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('from_date', 'Datum ab wann die ListEntry-Objekte'
                             ' ausgegeben werden sollen')
@holmaApp.param('to_date', 'Datum bis wann die ListEntry-Objekte'
                             'ausgegeben werden sollen')
class ListEntryDateTimeRelationOperations(Resource):
    @holmaApp.marshal_with(listEntry)
    # @secured
    def get(self, from_date, to_date):
        """Auslesen aller Listentry-Objekten die zwischen den zwei eingegebenen
        Daten geupdaten wurden.
                               """
        adm = StatisticAdministration()
        le = adm.get_list_entries_in_time_period(from_date, to_date)
        return le


@holmaApp.route('/retailer/<int:retailer_id>/listentries')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('retailer_id', 'Die ID des retailer-Objekts')
class RetailerRelatedListEntryOperations(Resource):
    @holmaApp.marshal_with(listEntry)
    # @ secured
    def get(self, retailer_id):
        """Auslesen von Listentry-Objekten die zu einem bestimmten
        Retailer gehören."""
        adm = Administration()
        rtl = adm.get_retailer_by_id(retailer_id)
        if rtl is not None:
            listentry_list = adm.get_list_entries_by_retailer_id(retailer_id)
            return listentry_list
        else:
            return "Retailer not found", 500


@holmaApp.route('/article/<int:article_id>/listentries')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('article_id', 'Die ID des Article-Objekts')
class ArticleRelatedListEntryOperations(Resource):
    @holmaApp.marshal_with(listEntry)
    # @ secured
    def get(self, article_id):
        """Auslesen von Listentry-Objekten die zu einem bestimmten
        Article gehören."""
        adm = Administration()
        art = adm.get_article_by_id(article_id)
        if art is not None:
            listentry_list = adm.get_list_entries_by_article_id(article_id)
            return listentry_list
        else:
            return "Article not found", 500


@holmaApp.route('/group/<int:group_id>/listentries')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('group_id', 'Die ID des group-Objekts')
class GroupRelatedListEntryOperations(Resource):
    @holmaApp.marshal_with(listEntry)
    # @ secured
    def get(self, group_id):
        """Auslesen von Listentry-Objekten die zu einer bestimmten
        Groupe gehören."""
        adm = Administration()
        grp = adm.get_group_by_id(group_id)
        if grp is not None:
            listentry_list = adm.get_standardarticles_by_group_id(group_id)
            return listentry_list
        else:
            return "Group not found", 500


@holmaApp.route('/group/<int:group_id>/listentry/<int:list_entry_id>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('group_id', 'Die ID des Group-Objekts')
@holmaApp.param('list_entry_id', 'Die ID des Listentry-Objekts')
class GroupListEntryStandardArticleRelationOperations(Resource):
    @holmaApp.marshal_with(listEntry)
    @holmaApp.marshal_with(group)
    # @secured
    def post(self, group_id, list_entry_id):
        """Füge ein bestimmten Listentry Objekt
        einer bestimmten Groupe hinzu"""
        adm = Administration()
        grp = adm.get_group_by_id(group_id)
        le = adm.get_list_entry_by_id(list_entry_id)

        if grp is not None and le is not None:
            result = adm.add_standardarticle_to_group(le, grp)
            return result
        else:
            return "Group or ListEntry not found", 500

    def delete(self, group_id, list_entry_id):
        """Lösch ein bestimmten Listentry Objekt von einer bestimmten Groupe"""
        adm = Administration()
        grp = adm.get_group_by_id(group_id)
        le = adm.get_list_entry_by_id(list_entry_id)
        if grp is not None and le is not None:
            result = adm.delete_standardarticle(le, grp)
            return result
        else:
            return "Group or Listentry not found", 500


@holmaApp.route('/retailers')
@holmaApp.response(500, 'Falls es zu einem Server-seitigem Fehler kommt.')
class RetailerListOperations(Resource):
    @holmaApp.marshal_list_with(retailer)
    # @secured
    def get(self):
        adm = Administration()
        ret_list = adm.get_all_retailers()
        return ret_list


@holmaApp.route('/retailer/<int:retailer_id>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('retailer_id', 'Die ID des retailer-Objekts')
class RetailerOperations(Resource):
    @holmaApp.marshal_list_with(retailer)
    # @secured
    def get(self, retailer_id):
        adm = Administration()
        rtl = adm.get_retailer_by_id(retailer_id)
        return rtl


@holmaApp.route('/retailer/by-name/<string:name>')
@holmaApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@holmaApp.param('name', 'Der Name des Retailers')
class RetailerByNameOperations(Resource):
    @holmaApp.marshal_list_with(retailer)
    # @secured
    def get(self, name):
        adm = Administration()
        rtl = adm.get_retailers_by_name(name)
        return rtl


if __name__ == '__main__':
    app.run(debug=True)
