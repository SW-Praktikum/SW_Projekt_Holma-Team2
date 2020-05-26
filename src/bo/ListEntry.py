from bo.BusinessObject import BusinessObject


class ListEntry(BusinessObject):
    def __init__(self):
        """Ein Listeneintrag ist ein Eintrag in der Einkaufsliste, der sämtliche Informationen zum Artikel und der
        Zuordnung enthält. Ein Listeneintrag kann auch ein "Standardartikel" sein."""
        super().__init__()
        self._article = None # nur als id (Fremdschlüssel)
        self._amount = 1.0
        self._unit = ""
        self._retailer = None # nur als id (Fremdschlüssel)
        self._purchasing_user = None # nur als id (Fremdschlüssel)
        self._shopping_list = None # nur als id (Fremdschlüssel)
        self._checked = False
        self._checked_ts = None
        self._standardarticle = False

    def __str__(self):
        return "Article: {}, amount: {} {}, purchasing user: {}, retailer: {}, checked: {}".format(
            self._article,
            self._amount,
            self._unit,
            self._purchasing_user,
            self._retailer,
            self._checked)

    def get_article(self):
        return self._article

    def get_amount(self):
        return self._amount

    def get_unit(self):
        return self._unit

    def get_retailer(self):
        return self._retailer

    def get_purchasing_user(self):
        return self._purchasing_user

    def get_shopping_list(self):
        return self._shopping_list

    def get_checked_ts(self):
        return self._checked_ts

    def set_article(self, article_id):
        self._article = article_id

    def set_amount(self, amount):
        self._amount = amount

    def set_unit(self, unit):
        self._unit = unit

    def set_retailer(self, retailer_id):
        self._retailer = retailer_id

    def set_purchasing_user(self, user_id):
        self._purchasing_user = user_id

    def set_shopping_list(self, shopping_list_id):
        self._shopping_list = shopping_list_id

    def set_checked(self, checked):
        self._checked = checked

    def set_checked_ts(self, checked_ts):
        self._checked_ts = checked_ts

    def set_standardarticle(self, standardarticle):
        self._standardarticle = standardarticle

    def check(self):
        self._checked = True

    def is_checked(self):
        return self._checked

    def is_standardarticle(self):
        return self._standardarticle

    @staticmethod
    def from_dict(dictionary=dict()):
        list_entry = ListEntry()
        list_entry.set_id(dictionary["id"])
        list_entry.set_name(dictionary["name"])
        list_entry.set_article(dictionary["article"])
        list_entry.set_amount(dictionary["amount"])
        list_entry.set_unit(dictionary["unit"])
        list_entry.set_retailer(dictionary["retailer"])
        list_entry.set_purchasing_user(dictionary["purchasingUser"])
        list_entry.set_shopping_list(dictionary["shoppingList"])
        list_entry.set_checked(dictionary["isChecked"])
        list_entry.set_checked_ts(dictionary["checkedTs"])
        list_entry.set_standardarticle(dictionary["isStandardarticle"])
        return list_entry

    """
    def delete(self):
        self._shopping_list.delete_shopping_list_entry(self)
    """