from bo.BusinessObject import BusinessObject

class ShoppingList(BusinessObject):
    def __init__(self):
        """Eine Einkaufsliste ist Teil *einer* Gruppe. Es können Listeinträge eingefügt werden - wahlweise auch
        Standardartikel. Für das UI gibt es Funktionen, um die Anzahl aller/erledigten Einträge einzusehen."""
        super().__init__()
        self._group = None

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

    """
    def add_list_entry(self, entry_id):
        self._list_entries.append(entry_id)
    
    def add_list_entries(self, list_entry_ids):
        for entry in list_entry_ids:
            self.add_list_entry(entry)

    def get_list_entries(self):
        return self._list_entries
        
    def get_list_entries_checked(self):
        list_entries_checked = []
        for eintrag in self._list_entries:
            if eintrag.is_checked():
                list_entries_checked.append(eintrag)
        return list_entries_checked

    def get_amout_of_list_entries(self):
        return len(self._list_entries)

    def get_amout_of_list_entries_checked(self):
        return len(self.get_list_entries_checked())

    def add_list_entry(self, article, amount=1, unit="", purchasing_person=None, retailer=None):
        list_entry = ListEntry(self, article, amount, unit, purchasing_person, retailer)
        self._list_entries.append(list_entry)
        return list_entry

    def add_standardarticles(self):
        for standardarticle in self._group.get_standardarticles():
            article = standardarticle.get_article()
            amount = standardarticle.get_amount()
            unit = standardarticle.get_unit()
            purchasing_person = standardarticle.get_purchasing_person()
            retailer = standardarticle.get_retailer()
            self.add_list_entry(article, amount, unit, purchasing_person, retailer)

    def delete_list_entry(self, list_entry):
        self._list_entries.remove(list_entry)

    def delete(self):
        self._group.delete_shopping_list(self)
    
    """