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

        for (id, name, date, email, google_id, last_update) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_creation_date(date)
            user.set_email(email)
            user.set_google_id(google_id)
            user.set_last_updated(last_update)
            result.append(user)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None
        cursor = self._connection.cursor()
        command = "SELECT * FROM user WHERE user_id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, date, email, google_id, last_update) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_creation_date(date)
            user.set_email(email)
            user.set_google_id(google_id)
            user.set_last_updated(last_update)
            result = user
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self, name):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT * FROM user WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, date, email, google_id, last_update) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_creation_date(date)
            user.set_email(email)
            user.set_google_id(google_id)
            user.set_last_updated(last_update)
            result = user
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()


        return result

    def find_by_email(self, email):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT * FROM user WHERE email LIKE '{}' ORDER BY email".format(email)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, date, email, google_id, last_update) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_creation_date(date)
            user.set_email(email)
            user.set_google_id(google_id)
            user.set_last_updated(last_update)
            result = user
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_google_id(self, google_id):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT * FROM user WHERE google_user_id={}".format(google_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, date, email, google_id, last_update) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_creation_date(date)
            user.set_email(email)
            user.set_google_id(google_id)
            user.set_last_updated(last_update)
            result = user
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_group(self, group):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT * FROM user INNER JOIN user_group_relation ON user.user_id = " \
                  "user_group_relation.user_id; WHERE group_id={}".format(group)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, date, email, google_id, last_update) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_creation_date(date)
            user.set_email(email)
            user.set_google_id(google_id)
            user.set_last_updated(last_update)
            result = user
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()

        return result

if (__name__ == "__main__"):
    with UserMapper() as mapper:
        result = mapper.find_all()
        for user in result:
            print(user)

if (__name__ == "__main__"):
    with UserMapper() as mapper:
        result = mapper.find_by_group(1)
        print(result)