from bo.User import User
from db.Mapper import Mapper


class UserMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        cursor = self._connection.cursor()
        command = "SELECT * FROM user"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = User.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, user_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM user WHERE user_id={}".format(user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = User.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        cursor = self._connection.cursor()
        command = "SELECT * FROM user WHERE name LIKE '{}' ORDER BY " \
                  "name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = User.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_email(self, email):
        cursor = self._connection.cursor()
        command = "SELECT * FROM user WHERE email LIKE '{}' ORDER BY " \
                  "email".format(email)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = User.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_google_id(self, google_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM user WHERE google_id=%s"
        data = (google_id,)
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        result = User.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, user):
        cursor = self._connection.cursor()

        command = "INSERT INTO user (user_id, name, creation_date, email, " \
                  "google_id, last_updated) VALUES (%s, %s, %s, %s, %s, %s)"
        data = (user.get_id(),
                user.get_name(),
                user.get_creation_date(),
                user.get_email(),
                user.get_google_id(),
                user.get_last_updated())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        user.set_id(cursor.lastrowid)
        return user

    def update(self, user):

        cursor = self._connection.cursor()
        command = "UPDATE user SET name=%s, email=%s, last_updated=%s " \
                  "WHERE user_id=%s"
        data = (user.get_name(),
                user.get_email(),
                user.get_last_updated(),
                user.get_id())

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
        print("All users in database:")
        result = mapper.find_all()
        for user in result:
            print(user)

        print("All users with name 'Dennis'")
        result = mapper.find_by_name("Dennis")
        for user in result:
            print(user)
