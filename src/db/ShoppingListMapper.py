from bo.ShoppingList import ShoppingList
from db.Mapper import Mapper


class ShoppingListMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        cursor = self._connection.cursor()
        command = "SELECT * FROM shopping_list"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ShoppingList.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, user_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM shopping_list " \
                  "WHERE shopping_list_id={}".format(user_id)
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
        command = "SELECT * FROM shopping_list WHERE name LIKE '{}' " \
                  "ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ShoppingList.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_group(self, group_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM shopping_list " \
                  "WHERE group_id={}".format(group_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ShoppingList.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, shopping_list):
        cursor = self._connection.cursor()

        command = "INSERT INTO shopping_list (shopping_list_id, name, " \
                  "group_id, creation_date, last_updated) " \
                  "VALUES (%s, %s, %s, %s, %s)"
        data = (shopping_list.get_id(),
                shopping_list.get_name(),
                shopping_list.get_group(),
                shopping_list.get_creation_date(),
                shopping_list.get_last_updated())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        shopping_list.set_id(cursor.lastrowid)
        return shopping_list

    def update(self, shopping_list):
        cursor = self._connection.cursor()
        command = "UPDATE shopping_list SET name=%s, group_id=%s, " \
                  "last_updated=%s WHERE shopping_list_id=%s"
        data = (shopping_list.get_name(),
                shopping_list.get_group(),
                shopping_list.get_last_updated(),
                shopping_list.get_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return shopping_list

    def delete(self, shopping_list):
        cursor = self._connection.cursor()

        command = "DELETE FROM shopping_list " \
                  "WHERE shopping_list_id={}".format(shopping_list.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_by_group(self, group):
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
