from bo.BusinessObject import BusinessObject

class Article(BusinessObject):
    def __init__(self):
        """Artikel, der für eine Gruppe erstellt wird."""
        super().__init__()
        self._group = None # nur als id (Fremdschlüssel)

    def __str__(self):
        return "Article: {}, part of group: {}".format(self.get_name(),
                                                       self.get_group())

    def get_group(self):
        return self._group

    def set_group(self, group_id):
        self._group = group_id

    @staticmethod
    def to_dict(obj):
        result = {
            "id": obj.get_id(),
            "name": obj.get_name(),
            "creationDate": datetime.strftime(obj.get_creation_date(),
                                              "%Y-%m-%dT%H:%M:%S.%fZ"),
            "lastUpdated": datetime.strftime(obj.get_last_updated(),
                                             "%Y-%m-%dT%H:%M:%S.%fZ"),
            "groupId": obj.get_group()
        }
        return result

    @staticmethod
    def from_dict(dictionary=dict()):
        article = Article()
        article.set_id(dictionary["id"])
        article.set_name(dictionary["name"])
        article.set_group(dictionary["group"])
        return article

    @staticmethod
    def from_tuples(tuples=list()):
        result = []
        for (article_id, name, group, creation_date, last_updated) in tuples:
            article = Article()
            article.set_id(article_id)
            article.set_name(name)
            article.set_group(group)
            article.set_creation_date(creation_date)
            article.set_last_updated(last_updated)
            result.append(article)
        return result