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
        command = "".format(member)
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


if (__name__ == "__main__"):
    with GroupMapper() as mapper:
        result = mapper.find_all()
        for group in result:
            print(group)

if (__name__ == "__main__"):
    with GroupMapper() as mapper:
        result = mapper.find_by_owner(30)
        print(result)