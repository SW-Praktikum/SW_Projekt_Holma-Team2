from bo.BusinessObject import BusinessObject


class ListEntry(BusinessObject):
    def __init__(self):
        """Ein Listeneintrag ist ein Eintrag in der Einkaufsliste, der sämtliche Informationen zum Artikel und der
        Zuordnung enthält. Ein Listeneintrag kann auch ein "Standardartikel" sein."""
        super().__init__()
        self._article = None
        self._amount = ""
        self._unit = ""
        self._retailer = None
        self._purchasing_person = None
        self._list = None
        self._checked = False
        self._standardarticle = False

    def __str__(self):
        return "Article: {}, amount: {} {}, purchasing person: {}, retailer: {}, checked: {}".format(
            self._article.get_name(),
            self._amount,
            self._unit,
            self._purchasing_person.get_name(),
            self._retailer.get_name(),
            self._checked)

    def get_article(self):
        return self._article

    def get_amount(self):
        return self._amount

    def get_unit(self):
        return self._unit

    def get_purchasing_person(self):
        return self._purchasing_person

    def get_retailer(self):
        return self._retailer

    def get_list(self):
        return self._list

    def set_article(self, article_id):
        self._article = article_id

    def set_amount(self, amount):
        self._amount = amount

    def set_unit(self, unit):
        self._unit = unit

    def set_purchasing_person(self, person_id):
        self._purchasing_person = person_id

    def set_retailer(self, retailer_id):
        self._retailer = retailer_id

    def set_checked(self, checked):
        self._checked = checked

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
        list_entry.set_purchasing_person(dictionary["purchasingPerson"])
        list_entry.set_retailer(dictionary["retailer"])
        list_entry.set_checked(dictionary["isChecked"])
        list_entry.set_standardarticle(dictionary["isStandardarticle"])
        return list_entry

    """
    def delete(self):
        self._list.delete_list_entry(self)
    """