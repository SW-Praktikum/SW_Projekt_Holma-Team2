from bo.Group import Group
from db.Mapper import Mapper


class GroupMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.group"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Group.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, group_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.group " \
                  "WHERE group_id={}".format(group_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Group.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        if len(result) == 0:
            return None
        return result[0]

    def find_by_name(self, name):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.group WHERE name LIKE '{}' " \
                  "ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Group.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_owner(self, user_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.group WHERE owner={}".format(user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Group.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, group):
        cursor = self._connection.cursor()
        command = "INSERT INTO githolma.group (group_id, name, creation_date, " \
                  "owner, last_updated) VALUES (%s, %s, %s, %s, %s)"
        data = (group.get_id(),
                group.get_name(),
                group.get_creation_date(),
                group.get_owner(),
                group.get_last_updated())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return group

    def update(self, group):
        cursor = self._connection.cursor()
        command = "UPDATE holma.group SET name=%s, owner=%s, " \
                  "last_updated=%s WHERE group_id=%s"
        data = (group.get_name(),
                group.get_owner(),
                group.get_last_updated(),
                group.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return group

    def delete(self, group):
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.group " \
                  "WHERE group_id={}".format(group.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if (__name__ == "__main__"):
    with GroupMapper() as mapper:
        print("All groups in database:")
        result = mapper.find_all()
        for group in result:
            print(group)

        print("All groups owned by User #28:")
        result = mapper.find_by_owner(28)
        for group in result:
            print(group)
