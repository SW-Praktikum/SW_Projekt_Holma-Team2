from bo.ListEntry import ListEntry
from db.Mapper import Mapper


class ListEntryMapper(Mapper):
    """Mapper-Klasse, die Listeneintrag-Objekte auf der relationalen DB abbildet.
    Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller vorhandenen Listeneinträge
        :return Listeneitrag-Objekt, das der übergebenen ID entspricht oder None
                wenn DB-Tupel nicht vorhanden ist.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.list_entry"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, list_entry_id):
        """Eindeutiges Auslesen eines Listeneintrags durch ID
        :return Listeneintrag-Objekt, das der übergebenen ID entspricht oder None
                wenn DB-Tupel nicht vorhanden ist.
        """
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
        """Auslesen von Listeneinträgen durch Name
        :param name:
        :return Eine Sammlung mit Listeneintrag-Objekten.
        """
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
        """Auslesen von Listeneinträgen durch Fremdschlüssel (retailer_id)
        geg. Einzelhändler
        :param retailer_id:
        :return Eine Sammlung mit Listeneintrag-Objekten.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.list_entry " \
                  "WHERE retailer={}".format(retailer_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_purchasing_user(self, user_id, archived_shopping_lists):
        """Auslesen von Listeneinträgen durch Fremdschlüssel (user_id)
        geg. Einkaufender User
        :param user_id:
        :return Eine Sammlung mit Listeneintrag-Objekten.
        """

        cursor = self._connection.cursor()
        if archived_shopping_lists == []:
            command = "SELECT * FROM holma.list_entry " \
                      "WHERE purchasing_user={}".format(user_id)
        else:
            shopping_list_ids = ", ".join([str(shopping_list.get_id())
                                           for shopping_list
                                           in archived_shopping_lists])

            command = "SELECT * FROM holma.list_entry " \
                      "WHERE purchasing_user={} " \
                      "AND shopping_list " \
                      "NOT IN ({})".format(user_id, shopping_list_ids)


        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)
        self._connection.commit()
        cursor.close()

        return result

    def find_list_entries_by_article(self, article_id):
        """Auslesen von Listeneinträgen durch Fremdschlüssel (article_id)
        geg. Artikel
        :param article_id:
        :return Eine Sammlung mit Listeneintrag-Objekten.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.list_entry " \
                  "WHERE article={}".format(article_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_list_entries_by_shopping_list_id(self, shopping_list):
        """Auslesen von Listeneinträgen durch Fremdschlüssel (shopping_list_id)
        geg. Shoppingliste
        :param shopping_list:
        :return Eine Sammlung mit Listeneintrag-Objekten.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.list_entry " \
                  "WHERE shopping_list={}".format(shopping_list.get_id())
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_checked_list_entries_by_shopping_list_id(self, shopping_list_id):
        """Auslesen von abgehakten Listeneinträgen durch Fremdschlüssel
        (shopping_list_id) geg. Shoppingliste
        :param shopping_list_id:
        :return Eine Sammlung mit abgehakten Listeneintrag-Objekten.
        """
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

    def find_list_entries_in_time_periode(self, from_date, to_date):
        """Auslesen von Listeneinträgen in einer bestimmten Zeitperiode
        :param from_date:
        :param to_date:
        :return Eine Sammlung mit Listeneintrag-Objekten, deren last_updated
                -Wert innerhalb der angegebenen Zeitperiode liegt.
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.list_entry WHERE last_updated " \
                  "BETWEEN '{}' AND '{}'".format(from_date, to_date)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, list_entry):
        """Einfügen eines Listeneintrag-Objekts

        lastrowid returns the value generated for an AUTO_INCREMENT
        column by the previous INSERT
        :param
        :return das bereits übergebene Listeneintrag-Objekt,
                jedoch mit korrekter ID
        """
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
        """Wiederholtes Schreiben / Aktualisieren eines
        Listeneintrag-Objekts
        :param list_entry:
        :return aktualisiertes Listeneintrag-Objekt
        """
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
        """Löschen der Daten eines Listeneintrag-Objekts aus der Datenbank
        :param list_entry:
        """
        self.delete_standardarticle_by_list_entry(list_entry)

        cursor = self._connection.cursor()
        command = "DELETE FROM holma.list_entry " \
                  "WHERE list_entry_id={}".format(list_entry.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_by_shopping_list(self, shopping_list):
        """Löschen der Daten eines Listeneintrag-Objekts aus der Datenbank anhand der
        der hinterlegten Shoppingliste
        :param shopping_list:
        """
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.list_entry " \
                  "WHERE shopping_list={}".format(shopping_list.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_by_article(self, article):
        """Löschen der Daten eines Listeneintrag-Objekts aus der Datenbank anhand der
        des hinterlegten Artikels
        :param shopping_list:
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM holma.list_entry " \
                  "WHERE article={}".format(article.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_purchasing_user(self, user, shopping_list=None):
        """Löschen der Daten eines User-Objekts aus der Datenbank anhand der
        der hinterlegten Shoppingliste

        Hier muss unterschieden werden zwischen User gruppenübergreifend
        als purchasing_user löschen (group = None) oder nur in einer
        bestimmten Gruppe löschen (group_id = )
        :param shopping_list:
        """
        cursor = self._connection.cursor()
        if shopping_list is None:
            command = "UPDATE holma.list_entry SET purchasing_user= null " \
                      "WHERE purchasing_user = {}".format(user.get_id())
        else:
            command = "UPDATE holma.list_entry SET purchasing_user= null " \
                      "WHERE purchasing_user = {} " \
                      "AND shopping_list={}".format(user.get_id(),
                                                    shopping_list.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    """Standardarticle"""

    def find_standardarticles_by_group_id(self, group_id):
        """Auslesen von als Standard-Artikel markierten
        Listeneinträgen durch Fremdschlüssel (group_id)
        geg. Gruppe
        :param group_id:
        :return Eine Sammlung mit Listeneintrag-Objekten, mit standardarticle
                = 1.
        """
        cursor = self._connection.cursor()
        command = "SELECT standard_article_group_relations.list_entry_id," \
                  " holma.list_entry.name, holma.list_entry.creation_date, " \
                  "holma.list_entry.purchasing_user, " \
                  "holma.list_entry.amount, holma.list_entry.article, " \
                  "holma.list_entry.unit, holma.list_entry.retailer, " \
                  "holma.list_entry.standardarticle, " \
                  "holma.list_entry.checked, holma.list_entry.shopping_list," \
                  " holma.list_entry.last_updated, " \
                  "holma.list_entry.checked_ts FROM " \
                  "standard_article_group_relations INNER JOIN list_entry ON" \
                  " standard_article_group_relations.list_entry_id=" \
                  "holma.list_entry.list_entry_id WHERE " \
                  "standard_article_group_relations.group_id = {}".format(
        group_id)
        cursor.execute(command)

        tuples = cursor.fetchall()

        result = ListEntry.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def insert_standardarticle(self, list_entry, group):
        """Verknüpfung eines Listeneintrag-Objekts mit einer Gruppe.
        :param list_entry:
        :param group:
        """
        cursor = self._connection.cursor()
        command = "INSERT INTO holma.standard_article_group_relations " \
                  "(list_entry_id, group_id) VALUES (%s, %s)"
        data = (list_entry.get_id(),
                group.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete_standardarticle(self, list_entry, group):
        """Löschen der Verbindung zwischen Listeneintrag und Gruppe.
        :param list_entry:
        :param group:
        """
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.standard_article_group_relations " \
                  "WHERE list_entry_id={} and group_id={}".format(
            list_entry.get_id(),
            group.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_standardarticle_by_group(self, group):
        """Löschen der Verknüpfung anhand der Gruppe.
        :param group:
        """
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.standard_article_group_relations " \
                  "WHERE group_id={}".format(group.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_standardarticle_by_list_entry(self, list_entry):
        """Löschen der Verknüpfung anhand des Listeneintrags.
        :param list_entry:
        """
        cursor = self._connection.cursor()
        command = "DELETE FROM holma.standard_article_group_relations " \
                  "WHERE list_entry_id={}".format(list_entry.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if __name__ == "__main__":
    with ListEntryMapper() as mapper:
        result = mapper.find_list_entries_in_time_periode('2020-07-01',
                                                          '2020-07-03')
        for entries in result:
            print(entries)
