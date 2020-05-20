from bo.BusinessObject import BusinessObject

class Article(BusinessObject):
    def __init__(self):
        """Artikel, der für eine Gruppe erstellt wird."""
        super().__init__()
        self._group = None

    def __str__(self):
        return "Article: {}, part of group: {}".format(self.get_name(), self.get_group())

    def get_group(self):
        return self._group

    def set_group(self, group_id):
        self._group = group_id

    @staticmethod
    def from_dict(dictionary=dict()):
        article = Article()
        article.set_id(dictionary["id"])
        article.set_name(dictionary["name"])
        article.set_group(dictionary["group"])
        return article