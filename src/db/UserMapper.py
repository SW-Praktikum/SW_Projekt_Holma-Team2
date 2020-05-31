from db.Mapper import Mapper
from bo.User import User


class UserMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT * FROM user"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, email, google_id, last_update) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_google_id(google_id)
            user.set_last_updated(last_update)
            """"Funktion User.set_creation date"""
            result.append(user)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None
        cursor = self._connection.cursor()
        command = "SELECT user_id, name, email, google_user_id, last_changed FROM user WHERE user_id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, google_id, last_update) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_google_id(google_id)
            user.set_last_updated(last_update)
            """"Funktion User.set_creation date"""
            result = user
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()

        return result



    def find_by_name(self, name):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT user_id, name, email, google_user_id, last_changed FROM user WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, email, google_id, last_update) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_google_id(google_id)
            user.set_last_updated(last_update)
            """"Funktion User.set_creation date"""
            result.append(user)

        self._connection.commit()
        cursor.close()

        return result

if (__name__ == "__main__"):
    with UserMapper() as mapper:
        result = mapper.find_all()
        for user in result:
            print(user)
"""
if (__name__ == "__main__"):
    with UserMapper() as mapper:
        result = mapper.find_by_id(28)
        print(result)
"""