from datetime import datetime
from bo.BusinessObject import BusinessObject


class ShoppingList(BusinessObject):
    def __init__(self):
        """Eine Einkaufsliste ist Teil *einer* Gruppe. Es können
        Listeinträge eingefügt werden - wahlweise auch
        Standardartikel. Für das UI gibt es Funktionen,
        um die Anzahl aller/erledigten Einträge einzusehen."""

        super().__init__()
        self._group = None  # nur als id (Fremdschlüssel)
        self._group_name = None
        self._archived = False

    def __str__(self):
        return "Shopping list: {}, part of group: {}".format(self.get_name(),
                                                             self.get_group())

    def get_group(self):
        return self._group

    def get_archived(self):
        return self._archived

    def set_group(self, group_id):
        self._group = group_id

    def set_archived(self, archived):
        self._archived = archived

    def to_dict(self):
        result = {
            "id": self.get_id(),
            "name": self.get_name(),
            "groupId": self.get_group(),
            "creationDate": self.get_creation_date(),
            "lastUpdated": self.get_last_updated(),
            "archived": self.get_archived()
        }
        return result

    @staticmethod
    def from_dict(dictionary=dict()):
        shopping_list = ShoppingList()
        shopping_list.set_id(dictionary["id"])
        shopping_list.set_name(dictionary["name"])
        shopping_list.set_group(dictionary["groupId"])
        shopping_list.set_archived(dictionary["archived"])
        shopping_list.set_creation_date(ShoppingList.date_format(dictionary["creationDate"]))
        shopping_list.set_last_updated(ShoppingList.date_format(dictionary["lastUpdated"]))
        return shopping_list

    @staticmethod
    def from_tuples(tuples=list()):
        result = []
        for (shopping_list_id, name, creation_date, group, last_update, archived) in tuples:
            shopping_list = ShoppingList()
            shopping_list.set_id(shopping_list_id)
            shopping_list.set_name(name)
            shopping_list.set_group(group)
            shopping_list.set_creation_date(creation_date)
            shopping_list.set_last_updated(last_update)
            shopping_list.set_archived(archived)
            result.append(shopping_list)
        return result