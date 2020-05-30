from db.Mapper import Mapper
from bo.User import User


class UserMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM user")
        tuples = cursor.fetchall()

        for (id, name, email, google_id) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_google_id(google_id)
            """"Funktion User.set_creation date"""
            result.append(user)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, name, email, google_user_id FROM user WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, google_id) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_google_id(google_id)
            result = user
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()

        return result



    def find_by_name(self, name):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, name, email, google_user_id FROM user WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, email, google_id) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_google_id(google_id)
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
        result = mapper.find_by_id(1)
        print(user)
"""