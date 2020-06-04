from bo.BusinessObject import BusinessObject

class User(BusinessObject):
    def __init__(self):
        """User, die auf dem Portal angemeldet ist."""
        super().__init__()
        self._email = ""
        self._google_id = ""
        self._group = None

    def __str__(self):
        return "User: {} {}, created: {}, E-Mail: {}, Google UserID: {}, last changed: {}".format(self.get_id(), self.get_name(), self.get_creation_date(), self.get_email(), self.get_google_id(), self.get_last_updated())

    def __repr__(self):
        return "Group_id: {}, Member {} {} {}".format(self.get_group(), self.get_id(), self.get_name(), self.get_email())

    def get_email(self):
        return self._email

    def get_google_id(self):
        return self._google_id

    def get_group(self):
        return self._group

    def set_email(self, email):
        self._email = email

    def set_google_id(self, google_id):
        self._google_id = google_id

    def set_group(self, group_id):
        self._group = group_id

    @staticmethod
    def from_dict(dictionary=dict()):
        user = User()
        user.set_id(dictionary["id"])
        user.set_name(dictionary["name"])
        user.set_email(dictionary["email"])
        user.set_google_id(dictionary["google_id"])
        return user
