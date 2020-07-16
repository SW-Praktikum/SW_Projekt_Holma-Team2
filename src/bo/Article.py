from datetime import datetime

from bo.BusinessObject import BusinessObject

class Article(BusinessObject):
    def __init__(self):
        """Artikel, der für eine Gruppe erstellt wird."""
        super().__init__()
        self._group = None # nur als id (Fremdschlüssel)
        self._count = 0

    def __str__(self):
        return "Article: {}, part of group: {}".format(self.get_name(),
                                                       self.get_group())

    def get_group(self):
        """Auslesen des Fremdschlüssels Gruppe"""
        return self._group

    def get_count(self):
        return self._count

    def set_group(self, group_id):
        """Setzen des Fremdschlüssels Gruppe"""
        self._group = group_id

    def set_count(self, count):
        self._count = count


    def to_dict(self):
        """Umwandeln Article() in ein Python dict()"""
        result = {
            "id": self.get_id(),
            "name": self.get_name(),
            "groupId": self.get_group(),
            "count": self.get_count(),
            "creationDate": self.get_creation_date(),
            "lastUpdated": self.get_last_updated()
        }
        return result

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Article()"""
        article = Article()
        article.set_id(dictionary["id"])
        article.set_name(dictionary["name"])
        article.set_group(dictionary["groupId"])
        article.set_count(dictionary["count"])
        article.set_creation_date(Article.date_format(dictionary["creationDate"]))
        article.set_last_updated(Article.date_format(dictionary["lastUpdated"]))
        return article

    @staticmethod
    def from_tuples(tuples=list()):
        """Umwandeln eines DB tuples in einen Article() (Python Objekt)"""
        result = []
        for (article_id, name, creation_date, group, last_updated) in tuples:
            article = Article()
            article.set_id(article_id)
            article.set_name(name)
            article.set_group(group)
            article.set_creation_date(creation_date)
            article.set_last_updated(last_updated)
            result.append(article)
        return result