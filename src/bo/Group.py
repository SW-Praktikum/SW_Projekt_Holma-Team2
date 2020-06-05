from bo.BusinessObject import BusinessObject

class Group(BusinessObject):
    def __init__(self):
        """Gruppe, der Nutzer und Einkaufslisten hinzugefügt, oder entfernt werden. Eine Gruppe
        verfügt über Standardartikel, die bei der Erstellung von Einkaufslisten (wahlweise)
        hinzugefügt werden."""
        super().__init__()
        self._owner = None # nur als id (Fremdschlüssel)
        self._member = ""
        """member als Liste?"""

    def __str__(self):
        return "Group: {} {}, created: {}, owned by: {}, last changed: {}".format(self.get_id(), self.get_name(), self.get_creation_date(), self.get_owner(), self.get_last_updated())

    def __repr__(self):
        return "Member id: {}, part of Group: {} {}".format(self.get_member(),self.get_name(), self.get_name())

    def get_owner(self):
        return self._owner

    def get_member(self):
        return self._member

    def set_owner(self, user_id):
        self._owner = user_id

    def set_member(self, user_id):
        self._member = user_id


    def from_dict(self, dictionary=dict()):
        group = Group()
        group.set_id(dictionary["id"])
        group.set_name(dictionary["name"])
        group.set_owner(dictionary["owner"])
        return group

