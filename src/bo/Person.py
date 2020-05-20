from bo.BusinessObject import BusinessObject

class Person(BusinessObject):
    def __init__(self):
        """Person, die auf dem Portal angemeldet ist."""
        super().__init__()
        self._email = ""
        self._google_id = ""

    def __str__(self):
        return "User: {}, E-Mail: {}, Google UserID: {}".format(self.get_name(), self.get_email(), self.get_google_id())

    def get_email(self):
        return self._email

    def get_google_id(self):
        return self._google_id

    def set_email(self, email):
        self._email = email

    def set_google_id(self, google_id):
        self._google_id = google_id

    @staticmethod
    def from_dict(dictionary=dict()):
        person = Person()
        person.set_id(dictionary["id"])
        person.set_name(dictionary["name"])
        person.set_email(dictionary["email"])
        person.set_google_id(dictionary["google_id"])
        return person
