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
        command = "SELECT user_group_relation.group_id, user_group_relation.user_id, " \
                  "user.name, user.creation_date, user.email, user.google_id, user.last_updated FROM user_group_relation " \
                  "INNER JOIN user ON user_group_relation.user_id=user.user_id WHERE user_group_relation.group_id ={}".format(group)
        cursor.execute(command)
        tuples = cursor.fetchall()


        """Wohin die group_id? Womöglich doch ein Attribut in User; group_id = None und diese dann wenn nötig vergeben, funktioniert auch ohne"""
        for (group_id, id, name, date, email, google_id, last_update) in tuples:
            user = User()
            user.set_group(group_id)
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

    def insert(self, user):

        cursor = self._connection.cursor()
        command = "INSERT INTO user (user_id, name, creation_date, email, google_id, last_updated) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (user.get_id(),
                user.get_name(),
                user.get_creation_date(),
                user.get_email(),
                user.get_google_id(),
                user.get_last_updated())
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        self._connection.commit()
        cursor.close()

        return user

    def update(self, user):

        cursor = self._connection.cursor()
        command = "UPDATE user" + "SET name=%s, email=%s, last_updated=%s  WHERE user_id=%s"
        data = (user.get_name(), user.get_email(), user.get_last_updated(), user.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return user

    def delete(self, user):

        cursor = self._connection.cursor()

        command = "DELETE FROM user WHERE user_id={}".format(user.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if __name__ == "__main__":
    with UserMapper() as mapper:
        result = mapper.find_all()
        for user in result:
            print(user)

if __name__ == "__main__":
    with UserMapper() as mapper:
        result = mapper.find_by_name("Dennis")
        for user in result:
            print(user)


if __name__ == "__main__":
    with UserMapper() as mapper:
        result = mapper.find_by_group(1)
        for user in result:
            print(repr(user))
