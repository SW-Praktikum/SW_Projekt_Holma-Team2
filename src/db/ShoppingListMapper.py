from bo.ShoppingList import ShoppingList
from db.Mapper import Mapper


class ShoppingListMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        cursor = self._connection.cursor()
        command = "SELECT * FROM shoppinglist"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ShoppingList.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, user_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM shoppinglist " \
                  "WHERE shoppinglist_id={}".format(user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ShoppingList.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        if len(result) == 0:
            return None
        return result[0]

    def find_by_name(self, name):
        cursor = self._connection.cursor()
        command = "SELECT * FROM shoppinglist WHERE name LIKE '{}' " \
                  "ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ShoppingList.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_group(self, group_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM shoppinglist " \
                  "WHERE group_id={}".format(group_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ShoppingList.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, shoppinglist):
        cursor = self._connection.cursor()

        command = "INSERT INTO shoppinglist (shoppinglist_id, name, " \
                  "group_id, creation_date, last_updated) " \
                  "VALUES (%s, %s, %s, %s, %s)"
        data = (shoppinglist.get_id(),
                shoppinglist.get_name(),
                shoppinglist.get_group(),
                shoppinglist.get_creation_date(),
                shoppinglist.get_last_updated())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        shoppinglist.set_id(cursor.lastrowid)
        return shoppinlist

    def update(self, shoppinglist):
        cursor = self._connection.cursor()
        command = "UPDATE shoppinglist SET name=%s, group_id=%s, " \
                  "last_updated=%s WHERE shoppinglist_id=%s"
        data = (shoppinglist.get_name(),
                shoppinglist.get_group(),
                shoppinglist.get_last_updated(),
                shoppinglist.get_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return shoppinglist

    def delete(self, shoppinglist):
        cursor = self._connection.cursor()

        command = "DELETE FROM shoppinglist " \
                  "WHERE shoppinglist_id={}".format(shoppinglist.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if __name__ == "__main__":
    with ShoppingListMapper() as mapper:
        print("All lists in database:")
        result = mapper.find_all()
        for shoppinglist in result:
            print(shoppinglist)

        print("All lists with name ''")
        result = mapper.find_by_group(1)
        for shoppinglist in result:
            print(shoppinglist)
