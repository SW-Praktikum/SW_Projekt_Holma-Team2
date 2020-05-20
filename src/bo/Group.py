from bo.BusinessObject import BusinessObject

class Group(BusinessObject):
    def __init__(self):
        """Gruppe, der Nutzer und Einkaufslisten hinzugefügt, oder entfernt werden. Eine Gruppe
        verfügt über Standardartikel, die bei der Erstellung von Einkaufslisten (wahlweise)
        hinzugefügt werden."""
        super().__init__()
        self._owner = None

    def __str__(self):
        return "Group: {}, owned by: {}".format(self.get_name(), self.get_owner())

    def get_owner(self):
        return self._owner

    def set_owner(self, person_id):
        self._owner = person_id

    def from_dict(self, dictionary=dict()):
        group = Group()
        group.set_id(dictionary["id"])
        group.set_name(dictionary["name"])
        group.set_owner(dictionary["owner"])

