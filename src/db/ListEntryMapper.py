from bo.ListEntry import ListEntry
from db.Mapper import Mapper


class ListEntryMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.list_entry"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, list_entry_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.list_entry " \
                  "WHERE list_entry_id={}".format(list_entry_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        if len(result) == 0:
            return None
        return result[0]

    def find_by_name(self, name):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.list_entry WHERE name LIKE '{}' " \
                  "ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_retailer(self, retailer_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.list_entry " \
                  "WHERE retailer={}".format(retailer_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_purchasing_user(self, user_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.list_entry " \
                  "WHERE purchasing_user={}".format(user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_list_entries_by_article(self, article_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.list_entry " \
                  "WHERE article={}".format(article_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_list_entries_by_shopping_list_id(self, shopping_list_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.list_entry " \
                  "WHERE shopping_list={}".format(shopping_list_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_list_entries_checked_by_shopping_list_id(self, shopping_list_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.list_entry " \
                  "WHERE checked=1 AND shopping_list={}".format(
            shopping_list_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_standardarticle(self, standardarticle):
        """Standardarticle und Group Verbindungstabelle - ListEntrie Id und Group Id,
        der ListEntrie soll kopiert werden und unter neuer Id abgelegt werden."""
        pass

    def insert_standardarticle(self, standardarticle):
        pass

    def delete_standardarticle(self, standardarticle):
        pass

        """Standardarticle Funktionen in eigenen Mapper."""

    def insert(self, list_entry):
        cursor = self._connection.cursor()
        command = "INSERT INTO holma.list_entry (list_entry_id, name, " \
                  "creation_date, purchasing_user, amount,  article, unit, " \
                  "retailer, standardarticle, shopping_list, checked, " \
                  "last_updated, checked_ts) " \
                  "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        data = (list_entry.get_id(),
                list_entry.get_name(),
                list_entry.get_creation_date(),
                list_entry.get_purchasing_user(),
                list_entry.get_amount(),
                list_entry.get_article(),
                list_entry.get_unit(),
                list_entry.get_retailer(),
                list_entry.get_standardarticle(),
                list_entry.get_shopping_list(),
                list_entry.get_checked(),
                list_entry.get_last_updated(),
                list_entry.get_checked_ts())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        list_entry.set_id(cursor.lastrowid)
        return list_entry

    def update(self, list_entry):
        cursor = self._connection.cursor()
        command = "UPDATE holma.list_entry SET name=%s, purchasing_user=%s, " \
                  "amount=%s, article=%s, unit=%s, retailer=%s, " \
                  "standardarticle=%s, shopping_list=%s, checked=%s, " \
                  "checked_ts=%s, last_updated=%s " \
                  "WHERE list_entry_id=%s"
        data = (list_entry.get_name(),
                list_entry.get_purchasing_user(),
                list_entry.get_amount(),
                list_entry.get_article(),
                list_entry.get_unit(),
                list_entry.get_retailer(),
                list_entry.get_standardarticle(),
                list_entry.get_shopping_list(),
                list_entry.get_checked(),
                list_entry.get_checked_ts(),
                list_entry.get_last_updated(),
                list_entry.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return list_entry

    def delete(self, list_entry):
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.list_entry " \
                  "WHERE list_entry_id={}".format(list_entry.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_by_shopping_list(self, shopping_list):
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.list_entry " \
                  "WHERE shopping_list={}".format(shopping_list.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_by_article(self, article):
        cursor = self._connection.cursor()

        command = "DELETE FROM holma.list_entry " \
                  "WHERE article={}".format(article.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if __name__ == "__main__":
    with ListEntryMapper() as mapper:
        result = mapper.find_list_entries_by_article(1)
        for entries in result:
            print(entries)
