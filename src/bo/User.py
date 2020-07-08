from datetime import datetime

from bo.BusinessObject import BusinessObject


class User(BusinessObject):
    def __init__(self):
        """User, die auf dem Portal angemeldet ist."""

        super().__init__()
        self._email = ""
        self._google_id = ""

    def __str__(self):
        s = "User: {} {}, created: {}, E-Mail: {}, Google UserID: {}, " \
            "last changed: {}".format(self.get_id(), self.get_name(),
                                      self.get_creation_date(),
                                      self.get_email(), self.get_google_id(),
                                      self.get_last_updated())
        return s

    def get_email(self):
        return self._email

    def get_google_id(self):
        return self._google_id

    def set_email(self, email):
        self._email = email

    def set_google_id(self, google_id):
        self._google_id = google_id

    def to_dict(self):
        result = {
            "id": self.get_id(),
            "name": self.get_name(),
            "email": self.get_email(),
            "googleId": self.get_google_id(),
            "creationDate": self.get_creation_date(),
            "lastUpdated": self.get_last_updated(),
        }
        return result

    @staticmethod
    def from_dict(dictionary=dict()):
        user = User()
        user.set_id(dictionary["id"])
        user.set_name(dictionary["name"])
        user.set_email(dictionary["email"])
        user.set_google_id(dictionary["googleId"])
        user.set_creation_date(User.date_format(dictionary["creationDate"]))
        user.set_last_updated(User.date_format(dictionary["lastUpdated"]))
        return user

    @staticmethod
    def from_tuples(tuples=list()):
        result = []
        for (user_id, name, creation_date, email, google_id,
             last_updated) in tuples:
            user = User()
            user.set_id(user_id)
            user.set_name(name)
            user.set_creation_date(creation_date)
            user.set_email(email)
            user.set_google_id(google_id)
            user.set_last_updated(last_updated)
            result.append(user)
        return result