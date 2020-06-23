from bo.ListEntry import ListEntry
from db.Mapper import Mapper

class ListEntryMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.listentry"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, listentry_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.listentry " \
                  "WHERE listentry_id={}".format(listentry_id)
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
        command = "SELECT * FROM holma.listentry WHERE name LIKE '{}' " \
                  "ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_retailer(self, retailer_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.listentry " \
                  "WHERE retailer={}".format(retailer_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_purchasing_user(self, user_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.listentry " \
                  "WHERE purchasing_user={}".format(user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_checked_list_entries(self):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.listentry " \
                  "WHERE checked=1"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_list_entries_by_article(self, article_id):
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.listentry " \
                  "WHERE article={}".format(article_id)
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

    def insert(self, listentry):
        cursor = self._connection.cursor()
        command = "INSERT INTO holma.listentry (listentry_id, name, creation_date, " \
                  "purchasing_user, amount, article, unit, retailer, standardarticle, checked, checked_ts, shopping_list, last_updated) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        data = (listentry.get_id(),
                listentry.get_name(),
                listentry.get_creation_date(),
                listentry.get_purchasing_user(),
                listentry.get_amount(),
                listentry.get_article(),
                listentry.get_unit(),
                listentry.get_retailer(),
                listentry.get_standardarticle(),
                listentry.get_checked(),
                listentry.get_checked_ts(),
                listentry.get_shopping_list(),
                listentry.get_last_updated())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return listentry

    def update(self, listentry):
        cursor = self._connection.cursor()
        command = "UPDATE holma.listentry SET name=%s, purchasing_user=%s, " \
                  "amount=%s, article=%s, unit=%s, retailer=%s. " \
                  "standardarticle=%s, checked=%s, checked_ts=%s" \
                  "shopping_list=%s, last_updated=%s WHERE listentry_id=%s"
        data = (listentry.get_name(),
                listentry.get_purchasing_user(),
                listentry.get_amount(),
                listentry.get_article(),
                listentry.get_unit(),
                listentry.get_retailer(),
                listentry.get_standardarticle(),
                listentry.get_checked(),
                listentry.get_checked_ts(),
                listentry.get_shopping_list(),
                listentry.get_last_updated(),
                listentry.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return listentry

    def delete(self, listentry):
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.listentry " \
                  "WHERE listentry_id={}".format(listentry.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

if __name__ == "__main__":
    with ListEntryMapper() as mapper:
        result = mapper.find_list_entries_by_article(1)
        for entries in result:
            print(entries)
