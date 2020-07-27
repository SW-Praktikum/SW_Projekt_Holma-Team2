from bo.ShoppingList import ShoppingList
from db.Mapper import Mapper


class ShoppingListMapper(Mapper):
    """Mapper-Klasse, die Shoppinglisten-Objekte auf der relationalen DB abbildet.
    Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller vorhandenen Shoppinglisten
        :return Eine Sammlung aller Shoppinglisten-Objekten.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM shopping_list"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ShoppingList.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_all_archived(self):
        """Auslesen aller vorhandenen Shoppinglisten
        :return Eine Sammlung aller Shoppinglisten-Objekten.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM shopping_list " \
                  "WHERE archived = TRUE"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ShoppingList.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, shopping_list_id):
        """Eindeutiges Auslesen einer Shoppingliste durch ID
        :param user_id:
        :return Shoppinglisten-Objekt, das der übergebenen ID entspricht
                oder None wenn DB-Tupel nicht vorhanden ist.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM shopping_list " \
                  "WHERE shopping_list_id={}".format(shopping_list_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ShoppingList.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        if len(result) == 0:
            return None
        return result[0]

    def find_by_name(self, name):
        """Auslesen von Shoppinglisten durch Name
        :param name:
        :return Eine Sammlung mit Shoppinglisten-Objekten.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM shopping_list " \
                  "WHERE name LIKE '{}' AND archived = FALSE " \
                  "ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ShoppingList.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_group(self, group, include_archived=False):
        """Auslesen von Shoppinglisten durch Fremdschlüssel (group_id) geg. Gruppe
        :param group: Gruppen-Objekt
        :param include_archived: Angabe, ob archivierte Shoppinglists
        ausgegeben werden sollen
        :return Eine Sammlung mit Shoppinglisten-Objekten.
        """

        incl_arch = ""
        if include_archived == False:
            incl_arch = " AND archived = FALSE"
        print(include_archived)
        cursor = self._connection.cursor()
        command = "SELECT * FROM shopping_list " \
                  "WHERE group_id={}{}".format(group.get_id(),
                                               incl_arch)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ShoppingList.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, shopping_list):
        """Einfügen eines Shoppinglisten-Objekts

        lastrowid returns the value generated for an AUTO_INCREMENT
        column by the previous INSERT
        :param shopping_list:
        :return das bereits übergebene Shoppinglisten-Objekt,
                jedoch mit korrekter ID
        """
        cursor = self._connection.cursor()

        command = "INSERT INTO shopping_list (shopping_list_id, name, " \
                  "group_id, creation_date, last_updated, archived) " \
                  "VALUES (%s, %s, %s, %s, %s, %s)"

        data = (shopping_list.get_id(),
                shopping_list.get_name(),
                shopping_list.get_group(),
                shopping_list.get_creation_date(),
                shopping_list.get_last_updated(),
                shopping_list.get_archived())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        shopping_list.set_id(cursor.lastrowid)
        return shopping_list

    def update(self, shopping_list):
        """Wiederholtes Schreiben / Aktualisieren eines Shoppinglisten-Objekts
        :param shopping_list
        :return aktualisiertes Shoppinglisten-Objekt
        """
        cursor = self._connection.cursor()
        command = "UPDATE shopping_list SET name=%s, group_id=%s, " \
                  "last_updated=%s, archived=%s WHERE shopping_list_id=%s"
        data = (shopping_list.get_name(),
                shopping_list.get_group(),
                shopping_list.get_last_updated(),
                shopping_list.get_archived(),
                shopping_list.get_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return shopping_list

    def delete(self, shopping_list):
        """Löschen der Daten eines Shoppinglisten-Objekts aus der Datenbank
        :param shopping_list
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM shopping_list " \
                  "WHERE shopping_list_id={}".format(shopping_list.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_by_group(self, group):
        """Löschen der Daten eines Shoppinglisten-Objekts aus der Datenbank
        anhand der group_id
        :param group
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM shopping_list " \
                  "WHERE group_id={}".format(group.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if __name__ == "__main__":
    with ShoppingListMapper() as mapper:
        print("All lists in database:")
        result = mapper.find_all()
        for shopping_list in result:
            print(shopping_list)

        print("All lists with name ''")
        result = mapper.find_by_group(1)
        for shopping_list in result:
            print(shopping_list)
