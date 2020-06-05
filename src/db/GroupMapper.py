from db.Mapper import Mapper
from bo.Group import Group


class GroupMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.group"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (group_id, name, date, owner, last_update) in tuples:
            group = Group()
            group.set_id(group_id)
            group.set_name(name)
            group.set_creation_date(date)
            group.set_owner(owner)
            group.set_last_updated(last_update)
            result.append(group)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.group WHERE group_id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, date, owner, last_update) = tuples[0]
            group = Group()
            group.set_id(id)
            group.set_name(name)
            group.set_creation_date(date)
            group.set_owner(owner)
            group.set_last_updated(last_update)
            result = group
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()

        return result


    def find_by_name(self, name):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.group WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (group_id, name, date, owner, last_update) in tuples:
            group = Group()
            group.set_id(group_id)
            group.set_name(name)
            group.set_creation_date(date)
            group.set_owner(owner)
            group.set_last_updated(last_update)
            result.append(group)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_owner(self, owner):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.group WHERE owner={}".format(owner)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, date, owner, last_update) = tuples[0]
            group = Group()
            group.set_id(id)
            group.set_name(name)
            group.set_creation_date(date)
            group.set_owner(owner)
            group.set_last_updated(last_update)
            result = group
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    """UNVOLLSTÄNDIG"""
    def find_by_member(self, member):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT user_group_relation.group_id, user_group_relation.user_id, " \
                  "holma.group.name, holma.group.creation_date, holma.group.owner, holma.group.last_updated FROM user_group_relation " \
                  "INNER JOIN holma.group ON user_group_relation.group_id=group.group_id WHERE user_group_relation.user_id ={}".format(member)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (group_id, name, date, owner, user_id, last_update) in tuples:
            group = Group()
            group.set_id(group_id)
            group.set_name(name)
            group.set_creation_date(date)
            group.set_owner(owner)
            """Hier liegt irgendwo ein Fehler idk"""
            group.set_member(user_id)
            group.set_last_updated(last_update)
            result.append(group)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, group):

        cursor = self._connection.cursor()
        command = "INSERT INTO holma.group (group_id, name, creation_date, owner, last_updated) VALUES (%s,%s,%s,%s,%s)"
        data = (group.get_id(),
                group.get_name(),
                group.get_creation_date(),
                group.get_owner(),
                group.get_last_updated())
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        self._connection.commit()
        cursor.close()

        return group

    def update(self, group):

        cursor = self._connection.cursor()
        command = "UPDATE holma.group" + "SET name=%s, owner=%s, last_updated=%s  WHERE group_id=%s"
        data = (group.get_name(), group.get_owner(), group.get_last_updated(), group.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return group

    def delete(self, group):

        cursor = self._connection.cursor()

        command = "DELETE FROM holma.group WHERE group_id={}".format(group.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

if (__name__ == "__main__"):
    with GroupMapper() as mapper:
        result = mapper.find_all()
        for group in result:
            print(group)

if (__name__ == "__main__"):
    with GroupMapper() as mapper:
        result = mapper.find_by_member(28)
        for group in result:
            print(repr(group))

