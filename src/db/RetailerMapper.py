from bo.Retailer import Retailer
from db.Mapper import Mapper


class RetailerMapper(Mapper):
    """Mapper-Klasse, die Einzelhändler-Objekte auf der relationalen DB abbildet.
    Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller vorhandenen Einzelhändler
        :return Eine Sammlung aller Einzelhändler-Objekten.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.retailer"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Retailer.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Eindeutiges Auslesen eines Einzelhändlers durch ID
        :param
        :return Einzelhändler-Objekt, das der übergebenen ID entspricht oder None
                wenn DB-Tupel nicht vorhanden ist.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.retailer WHERE retailer_id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Retailer.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        if len(result) == 0:
            return None
        return result[0]

    def find_by_name(self, name):
        """Auslesen von Einzelhändlern durch Name
        :param name:
        :return Eine Sammlung mit Einzelhändler-Objekten.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.retailer WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Retailer.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_most_frequent_retailers(self, user):
        """Auslesen der Einzelhändler-Häufigkeit innerhalb einer Gruppe
        :param group:
        :return: Eine Sammlung mit Artikel-Objekten und die dazugehörige
                 Häufigkeit
        """
        retailers = self.find_all()
        retailer_ids = ", ".join([str(retailer.get_id()) for retailer in retailers])
        cursor = self._connection.cursor()
        command = "SELECT retailer, COUNT(retailer) AS MOST_FREQUENT " \
                  "FROM holma.list_entry " \
                  "WHERE retailer in ({}) AND purchasing_user = {} AND checked=1 " \
                  "GROUP BY retailer " \
                  "ORDER BY COUNT(retailer) DESC".format(retailer_ids, user.get_id())

        cursor.execute(command)
        tuples = cursor.fetchall()

        most_frequent = {}
        for (retailer_id,count) in tuples:
            most_frequent[retailer_id] = count

        result = []
        for retailer in retailers:
            if retailer.get_id() in most_frequent:
                retailer.set_count(most_frequent[retailer.get_id()])
                result.append(retailer)

        self._connection.commit()
        cursor.close()

        result.sort(key=lambda retailer: retailer.get_count(), reverse=True)
        return result

    def insert(self, retailer):
        """Einfügen eines Einzelhändler-Objekts

        lastrowid returns the value generated for an AUTO_INCREMENT
        column by the previous INSERT
        :param retailer
        :return das bereits übergebene Einzelhändler-Objekt,
                jedoch mit korrekter ID
        """
        cursor = self._connection.cursor()
        command = "INSERT INTO holma.retailer (retailer_id, name, creation_date, last_updated) VALUES (%s,%s,%s," \
                  "%s)"
        data = (retailer.get_id(),
                retailer.get_name(),
                retailer.get_creation_date(),
                retailer.get_last_updated())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        retailer.set_id(cursor.lastrowid)
        return retailer

    def update(self, retailer):
        """Wiederholtes Schreiben / Aktualisieren eines Einzelhändler-Objekts
        :param retailer:
        :return aktualisiertes Einzelhändler-Objekt
        """
        cursor = self._connection.cursor()
        command = "UPDATE holma.retailer SET name=%s, last_updated=%s  WHERE retailer_id=%s"
        data = (retailer.get_name(), retailer.get_last_updated(), retailer.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return retailer

    def delete(self, retailer):
        """Löschen der Daten eines Einzelhändler-Objekts aus der Datenbank
        :param retailer:
        """
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.retailer WHERE retailer_id={}".format(retailer.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if __name__ == "__main__":
    with RetailerMapper() as mapper:
        result = mapper.find_all()
        for retailer in result:
            print(retailer)
