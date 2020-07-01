from datetime import datetime

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

    def to_dict(self):
        result = {
            "id": self.get_id(),
            "name": self.get_name(),
            "creationDate": datetime.strftime(self.get_creation_date(),
                                              "%Y-%m-%dT%H:%M:%S.%fZ"),
            "lastUpdated": datetime.strftime(self.get_last_updated(),
                                             "%Y-%m-%dT%H:%M:%S.%fZ"),
            "groupId": self.get_group()
        }
        return result

    @staticmethod
    def from_dict(dictionary=dict()):
        article = Article()
        article.set_id(dictionary["id"])
        article.set_name(dictionary["name"])
        article.set_creation_date(datetime.strptime(dictionary["creationDate"],
                                                 "%Y-%m-%dT%H:%M:%S.%fZ"))
        article.set_last_updated(datetime.strptime(dictionary["lastUpdated"],
                                                 "%Y-%m-%dT%H:%M:%S.%fZ"))
        article.set_group(dictionary["groupId"])
        return article

    @staticmethod
    def from_tuples(tuples=list()):
        result = []
        for (article_id, name, creation_date, group, last_updated) in tuples:
            article = Article()
            article.set_id(article_id)
            article.set_name(name)
            article.set_group(group)
            article.set_creation_date(creation_date)
            article.set_last_updated(last_updated)
            result.append(article)
        if len(result) == 1:
            return result[0]
        return result