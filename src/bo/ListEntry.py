from bo.BusinessObject import BusinessObject


class ListEntry(BusinessObject):
    def __init__(self):
        """Ein Listeneintrag ist ein Eintrag in der Einkaufsliste, der
        sämtliche Informationen zum Artikel und der Zuordnung enthält.
        Ein Listeneintrag kann auch ein "Standardartikel" sein."""

        super().__init__()
        self._article = None  # nur als id (Fremdschlüssel)
        self._article_name = None
        self._amount = 1.0
        self._unit = ""
        self._retailer = None  # nur als id (Fremdschlüssel)
        self._retailer_name = None
        self._purchasing_user = None  # nur als id (Fremdschlüssel)
        self._purchasing_user_name = None
        self._shopping_list = None  # nur als id (Fremdschlüssel)
        self._shopping_list_name = None
        self._checked = False
        self._checked_ts = None
        self._standardarticle = False

    def __str__(self):
        s = "Article: {}, amount: {} {}, purchasing user: {}, retailer: {}, " \
            "checked: {}".format(self._article, self._amount, self._unit,
                                 self._purchasing_user, self._retailer,
                                 self._checked)
        return s

    def get_article(self):
        """Auslesen des Fremdschlüssels article"""
        return self._article

    def get_amount(self):
        """Auslesen der Menge"""
        return self._amount

    def get_unit(self):
        """Auslesen der Einheit"""
        return self._unit

    def get_retailer(self):
        """Auslesen des Fremdschlüssels retailer"""
        return self._retailer

    def get_standardarticle(self):
        """Auslesen ob ListEntry ein Standardarticle ist"""
        return self._standardarticle

    def get_purchasing_user(self):
        """Auslesen des Fremdschlüssels purchasing_user"""
        return self._purchasing_user

    def get_shopping_list(self):
        """Auslesen des Fremdschlüssels shopping_list"""
        return self._shopping_list

    def get_checked(self):
        """Auslesen ob ListEntry abgehakt"""
        return self._checked

    def get_checked_ts(self):
        """Auslesen wann ListEntry abgehakt"""
        return self._checked_ts

    def set_article(self, article_id):
        """Setzen des Fremdschlüssels article"""
        self._article = article_id

    def set_amount(self, amount):
        """Setzen der Menge"""
        self._amount = amount

    def set_unit(self, unit):
        """Setzen der Einheit"""
        self._unit = unit

    def set_retailer(self, retailer_id):
        """Setzen des Fremdschlüssels retailer"""
        self._retailer = retailer_id

    def set_purchasing_user(self, user_id):
        """Setzen des Fremdschlüssels purchasing_user"""
        self._purchasing_user = user_id

    def set_shopping_list(self, shopping_list_id):
        """Setzen des Fremdschlüssels shopping_list"""
        self._shopping_list = shopping_list_id

    def set_checked(self, checked):
        """Setzen ListEntry ob ab- bzw. enthakt"""
        self._checked = checked

    def set_checked_ts(self, checked_ts):
        """Zeitpunkt setzen, wann ListEntry abgehakt wurde"""
        self._checked_ts = checked_ts

    def set_standardarticle(self, standardarticle):
        self._standardarticle = standardarticle

    def check(self):
        """ListEntry abhaken"""
        self._checked = True

    def is_checked(self):
        """Auslesen Attribut _checked"""
        return self._checked

    def is_standardarticle(self):
        """Auslesen Attribut _standardarticle"""
        return self._standardarticle

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen ListEntry()"""
        list_entry = ListEntry()
        list_entry.set_id(dictionary["id"])
        list_entry.set_name(dictionary["name"])
        list_entry.set_purchasing_user(dictionary["purchasingUserId"])
        list_entry.set_amount(dictionary["amount"])
        list_entry.set_article(dictionary["articleId"])
        list_entry.set_unit(dictionary["unit"])
        list_entry.set_retailer(dictionary["retailerId"])
        list_entry.set_standardarticle(dictionary["standardarticle"])
        list_entry.set_checked(dictionary["checked"])
        list_entry.set_shopping_list(dictionary["shoppingListId"])
        list_entry.set_checked_ts(ListEntry.date_format(dictionary["checkedTs"]))
        list_entry.set_creation_date(ListEntry.date_format(dictionary["creationDate"]))
        list_entry.set_last_updated(ListEntry.date_format(dictionary["lastUpdated"]))

        return list_entry

    @staticmethod
    def from_tuples(tuples=list()):
        """Umwandeln eines DB tuples in einen ListEntry() (Python Objekt)"""
        result = []
        for (listentry_id, name, creation_date, purchasing_user, amount, article, unit, retailer, standardarticle, checked, shopping_list, last_updated, checked_ts) in tuples:
            listentry = ListEntry()
            listentry.set_id(listentry_id)
            listentry.set_name(name)
            listentry.set_creation_date(creation_date)
            listentry.set_purchasing_user(purchasing_user)
            listentry.set_amount(amount)
            listentry.set_article(article)
            listentry.set_unit(unit)
            listentry.set_retailer(retailer)
            listentry.set_standardarticle(standardarticle)
            listentry.set_checked(checked)
            listentry.set_shopping_list(shopping_list)
            listentry.set_last_updated(last_updated)
            listentry.set_checked_ts(checked_ts)
            result.append(listentry)
        return result

