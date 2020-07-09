from datetime import datetime

from bo.BusinessObject import BusinessObject


class Group(BusinessObject):
    def __init__(self):
        """Gruppe, der Nutzer und Einkaufslisten hinzugefügt, oder
        entfernt werden. Eine Gruppe verfügt über Standardartikel, die
        bei der Erstellung von Einkaufslisten (wahlweise) hinzugefügt
        werden."""

        super().__init__()
        self._owner = None  # nur als id (Fremdschlüssel)

    def __str__(self):
        s = "Group: {} {}, created: {}, owned by: {}, " \
            "last changed: {}".format(self.get_id(), self.get_name(),
                                      self.get_creation_date(),
                                      self.get_owner(),
                                      self.get_last_updated())
        return s

    def get_owner(self):
        return self._owner

    def set_owner(self, user_id):
        self._owner = user_id

    def to_dict(self):
        result = {
            "id": self.get_id(),
            "name": self.get_name(),
            "owner": self.get_owner(),
            "creationDate": self.get_creation_date(),
            "lastUpdated": self.get_last_updated()
        }
        return result

    @staticmethod
    def from_dict(dictionary=dict()):
        group = Group()
        group.set_id(dictionary["id"])
        group.set_name(dictionary["name"])
        group.set_creation_date(Group.date_format(dictionary["creationDate"]))
        group.set_last_updated(Group.date_format(dictionary["lastUpdated"]))
        group.set_owner(dictionary["owner"])
        return group

    @staticmethod
    def from_tuples(tuples=list()):
        result = []
        for (group_id, name, creation_date, owner, last_update) in tuples:
            group = Group()
            group.set_id(group_id)
            group.set_name(name)
            group.set_creation_date(creation_date)
            group.set_last_updated(last_update)
            group.set_owner(owner)
            result.append(group)
        return result