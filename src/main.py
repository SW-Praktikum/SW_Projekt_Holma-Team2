from flask import Flask
from flask_restx import Api, Resource, fields
from flask_cors import CORS

from src.ListAdministration import Administration
from src.bo.User import User
from src.bo.Group import Group

app = Flask(__name__)

"""Flask-Erweiterung für Cross-Origin Resource Sharing"""
CORS(app, resources=r'/app/*')

api = Api(app, version='1.0', title='HOLMA API',
          description='Eine rudimentäre Demo-API für Listenerstellung.')

"""Namespaces"""
listingapp = api.namespace('app', description="Funktionen der App")

bo = api.model('BusinessObject', {
    'name': fields.String(attribute='_name', description='Name eines Objekts'),
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
    'creation_date': fields.Date(attribute='_creation_date',
                                 description='Erstellungsdatum des BOs, wird durch Unix Time Stamp ermittlet'),
    'last_changed': fields.Date(attribute='_last_changed',
                                description='Änderungsdatum des BOs, wird durch Unix Time Stamp ermittlet')
})

user = api.inherit('User', bo, {
    'email': fields.String(attribute='_email', description='E-Mail-Adresse eines Benutzers'),
    'google_id': fields.List(attribute='_google_id'),
})

group = api.inherit('Group', bo, {
    'owner': fields.Integer(attribute='_owner', description='Unique Id des Gruppeninhabers'),
})

shoppingList = api.inherit('ShoppingList', bo, {
    'group': fields.Integer(attribute='_group', description='ID der Gruppe zu der diese Liste gehört'),
})

listEntry = api.inherit('ListEntry', bo, {
    'article': fields.Integer(attribute='_article',
                              description='zu welchem Artikle gehört dieses Entry? '),
    'amount': fields.Float(attribute='_amount',
                           description='Menge des Entries '),
    'unit': fields.String(attribute='_unit',
                          description='Einheit des Entries '),
    'purchasing_user': fields.String(attribute='_purchasing_user',
                                     description='Wer das Artikle kaufen muss '),
    'shopping_list': fields.Integer(attribute='_Shopping_list',
                                    description='zu welcher Liste diese Entry gehört?'),
    'retailer': fields.String(attribute='_retailer',
                              description='Bei wem das Artikle gekauft  '),
    'checked': fields.Boolean(attribute='_checked',
                              description='wurde es bereits gekauft'),
    'checked_ts': fields.DateTime(attribute='_checked_ts',
                                  description='wann wurde es gekauft'),
    'standardarticle': fields.Boolean(attribute='_standardarticle',
                                      description='ist es ein Standardartikle '),
})

article = api.inherit('Article', bo, {
    'group': fields.Integer(attribute='_group', description='zu welcher Groupe dieses Artikle gehört?'),
})

retailer = api.inherit('Retailer', bo)


@listingapp.route('/users')
@listingapp.response(500, 'Falls es zu einem Server -seitigen Fehler kommt')
class UserListOperations(Resource):
    @listingapp.marshal_list_with(user)
    # @secured
    def get(self):
        adm = Administration()
        user_list = adm.get_all_users()
        return user_list

    @listingapp.marshal_with(user, code=200)
    @listingapp.expect(user)  # Wir erwarten ein USer-Objekt von Client-Seite.
    # @secured
    def post(self):
        adm = Administration()

        proposal = User.from_dict(api.payload)

        if proposal is not None:
            u = adm.create_user(proposal.get_email(), proposal.get_google_id())
            return u, 200
        else:
            return '', 500


@listingapp.route('/users/<int:id>')
@listingapp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@listingapp.param('id', 'Die ID des User-Objekts')
class UserOperations(Resource):
    @listingapp.marshal_with(user)
    # @secured
    def get(self, id):

        adm = Administration()
        us = adm.get_user_by_id(id)
        return us

    # @secured
    def delete(self, id):

        adm = Administration()
        us = adm.get_user_by_id(id)
        adm.delete_user(us)
        return '', 200

    @listingapp.marshal_with(user)
    @listingapp.expect(user, validate=True)
    # @secured
    def put(self, id):
        adm = Administration()
        u = User.from_dict(api.payload)

        if u is not None:
            u.set_id(id)
            adm.save_user(u)
            return '', 200
        else:
            return '', 500


@listingapp.route('/users/<string:name>')
@listingapp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@listingapp.param('name', 'Der Name des Users')
class UserByNameOperations(Resource):
    @listingapp.marshal_with(user)
    # @secured
    def get(self, name):

        adm = Administration()
        us = adm.get_user_by_name(name)
        return us

@listingapp.route('/groups')
@listingapp.response(500,'Falls es zu einem Server-seitigem Fehler kommt.')
class GroupListOperations(Resource):
    @listingapp.marshal_list_with(group)
    #@secured
    def get(self):

        adm = Administration()
        group_list = adm.get_all_groups()
        return group_list


@listingapp.route('/groups/<int:id>')
@listingapp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@listingapp('id', 'Die ID des Group-Objekts')
class GroupOperations(Resource):
    @listingapp.marshal_with(group)
    #@secured
    def get(self, id):

        adm = Administration()
        grp = adm.get_group_by_id(id)
        return grp

    #@secured
    def delete(self, id):

        adm = Administration()
        grp = adm.get_group_by_id(id)
        adm.delete_group(grp)
        return '', 200

    @listingapp.marshal_with(group)
    @listingapp.expect(group, validate=True)
    #@secured
    def put(self, id):
        adm = Administration()
        u = Group.from_dict(api.payload)

        if u is not None:
            u.set_id(id)
            adm.save_group(u)
            return '', 200
        else:
            return '', 500

@listingapp.route('/users/<int:id>/groups')
@listingapp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@listingapp.param('id', 'Die ID des user-Objekts')
class UserRelatedGroupOperations(Resource):
    @listingapp.marshal_with(group)
    #@secured
    def get(self, id):

        adm = Administration()
        us = adm.get_user_by_id(id)

        if us is not None:
            # Jetzt erst lesen wir die Konten des Customer aus.
            group_list = adm.get_groups_by_user_id(us)
            return group_list
        else:
            return "User not found", 500

    @listingapp.marshal_with(group, code=201)
    #@secured
    def post(self, id):

        adm = Administration()
        us = adm.get_user_by_id(id)

        if us is not None:

            result = adm.create_group(us)
            return result
        else:
            return "User unknown", 500

#Neu


@listingapp.route('/group/<int:id>/users')
@listingapp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@listingapp.param('id', 'Die ID des Group-Objekts')
class GroupRelatedUserOperations(Resource):
    @listingapp.marshal_with(group)
    #@secured
    def get(self, id):
        adm = Administration()
        # Diese Classe habe ich mir dazu wiedermal überlegt
        grp = adm.get_group_by_id(id)

        if grp is not None:
            user_list = adm.get_members_by_group_id(grp)
            return user_list
        else:
            return "User not found", 500





