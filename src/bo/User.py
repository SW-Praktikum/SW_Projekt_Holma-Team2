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

    @staticmethod
    def to_dict(obj):
        result = {
            "id": obj.get_id(),
            "name": obj.get_name(),
            "creationDate": datetime.strftime(obj.get_creation_date(),
                                              "%Y-%m-%dT%H:%M:%S.%fZ"),
            "lastUpdated": datetime.strftime(obj.get_last_updated(),
                                             "%Y-%m-%dT%H:%M:%S.%fZ"),
            "email": obj.get_email(),
            "googleId": obj.get_google_id()
        }
        return result

    @staticmethod
    def from_dict(dictionary=dict()):
        user = User()
        user.set_id(dictionary["id"])
        user.set_name(dictionary["name"])
        user.set_creation_date(datetime.strptime(dictionary["creationDate"],
                                                 "%Y-%m-%dT%H:%M:%S.%fZ"))
        user.set_creation_date(datetime.strptime(dictionary["lastUpdated"],
                                                 "%Y-%m-%dT%H:%M:%S.%fZ"))
        user.set_email(dictionary["email"])
        user.set_google_id(dictionary["googleId"])
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
