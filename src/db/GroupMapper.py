from bo.Group import Group
from db.Mapper import Mapper


class GroupMapper(Mapper):
    """Mapper-Klasse, die Gruppen-Objekte auf der relationalen DB abbildet.
    Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller vorhandenen Gruppen
        :return Eine Sammlung aller Gruppen-Objekten.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.group"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Group.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, group_id):
        """Eindeutiges Auslesen einer Gruppe durch ID
        :param group_id:
        :return Gruppen-Objekt, das der übergebenen ID entspricht oder None
                wenn DB-Tupel nicht vorhanden ist.
        """
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
        """Auslesen von Gruppen durch Name
        :param name:
        :return Eine Sammlung mit Gruppen-Objekten.
        """
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
        """Auslesen von Gruppen durch Fremdschlüssel (user_id) geg. Owner
        :param user_id:
        :return Eine Sammlung mit Gruppen-Objekten.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.group WHERE owner={}".format(user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Group.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, group):
        """Einfügen eines Gruppen-Objekts

        lastrowid returns the value generated for an AUTO_INCREMENT
        column by the previous INSERT
        :param group:
        :return das bereits übergebene Gruppen-Objekt, jedoch mit korrekter ID
        """
        cursor = self._connection.cursor()
        command = "INSERT INTO holma.group (group_id, name, creation_date, " \
                  "owner, last_updated) VALUES (%s, %s, %s, %s, %s)"
        data = (group.get_id(),
                group.get_name(),
                group.get_creation_date(),
                group.get_owner(),
                group.get_last_updated())
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()

        group.set_id(cursor.lastrowid)
        return group

    def update(self, group):
        """Wiederholtes Schreiben / Aktualisieren eines Gruppen-Objekts
        :param group:
        :return aktualisiertes Gruppen-Objekt
        """
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
        """Löschen der Daten eines Gruppen-Objekts aus der Datenbank
        :param group:
        """
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.group " \
                  "WHERE group_id={}".format(group.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_owner(self, user, group=None):
        """
        Löschen des Owners einer Gruppe aus der Datenbank

        Dabei wird unterschieden zwischen; Owner aus allen Gruppen löschen
        (wenn User gelöscht wird) und Owner aus angegebener Gruppe löschen.
        :param user:
        :param group:
        """
        cursor = self._connection.cursor()
        if group is None:
            command = "UPDATE holma.group SET owner= null WHERE owner = {}"\
            .format(user.get_id())
        else:
            command = "UPDATE holma.group SET owner= null WHERE owner = {} " \
                      "AND group_id= {}".format(user.get_id(), group.get_id())
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
