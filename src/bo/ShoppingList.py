from bo.BusinessObject import BusinessObject


class ShoppingList(BusinessObject):
    def __init__(self):
        """Eine Einkaufsliste ist Teil *einer* Gruppe. Es können Listeinträge eingefügt werden - wahlweise auch
        Standardartikel. Für das UI gibt es Funktionen, um die Anzahl aller/erledigten Einträge einzusehen."""
        super().__init__()
        self._group = None  # nur als id (Fremdschlüssel)
        
    def __str__(self):
        return "Shopping list: {}, part of group: {}".format(self.get_name(), self.get_group())

    def get_group(self):
        return self._group

    def set_group(self, group_id):
        self._group = group_id

    @staticmethod
    def from_dict(dictionary=dict()):
        shoppinglist = ShoppingList()
        shoppinglist.set_id(dictionary["id"])
        shoppinglist.set_name(dictionary["name"])
        shoppinglist.set_group(dictionary["group"])
        return shoppinglist

    @staticmethod
    def from_tuples(tuples=list()):
        result = []
        for (shoppinglist_id, name, creation_date, last_update) in tuples:
            shoppinglist = ShoppingList()
            shoppinglist.set_id(shoppinglist_id)
            shoppinglist.set_name(name)
            shoppinglist.set_group(group_id)
            shoppinglist.set_creation_date(creation_date)
            shoppinglist.set_last_updated(last_update)
            result.append(shoppinglist)
        return result