from bo.Article import Article
from db.Mapper import Mapper


class ArticleMapper(Mapper):
    """Mapper-Klasse, die Gruppen-Objekte auf der relationalen DB abbildet.
    Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller vorhandenen Artikel
        :return
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.article"
        cursor.execute(command)
        tuples = cursor.fetchall()
        result = Article.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, article_id):
        """Eindeutiges Auslesen eines Artikels durch ID
        :param
        :return
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.article " \
                  "WHERE article_id={}".format(article_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Article.from_tuples(tuples)
        
        self._connection.commit()
        cursor.close()
        if len(result) == 0:
            return None
        return result[0]

    def find_by_name(self, name):
        """Auslesen von Artikeln durch Name
        :param
        :return
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.article WHERE name LIKE '{}' " \
                  "ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Article.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_group(self, group_id):
        """Auslesen von Artikeln durch Fremdschlüssel (group_id) geg. Gruppe
        :param
        :return
        """
        cursor = self._connection.cursor()
        command = "SELECT * FROM holma.article " \
                  "WHERE group_id={}".format(group_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Article.from_tuples(tuples)

        self._connection.commit()
        cursor.close()

        return result

    def find_most_frequent_articles_by_group(self, group):
        articles = self.find_by_group(group.get_id())
        article_ids = ", ".join([str(article.get_id()) for article in articles])
        cursor = self._connection.cursor()
        command = "SELECT article, COUNT(article) AS MOST_FREQUENT " \
                  "FROM holma.list_entry " \
                  "WHERE article in ({}) " \
                  "GROUP BY article " \
                  "ORDER BY COUNT(article) DESC".format(article_ids)
        print(command)
        cursor.execute(command)
        tuples = cursor.fetchall()

        most_frequent = {}
        for (article_id,count) in tuples:
            most_frequent[article_id] = count

        result = []
        for article in articles:
            if article.get_id() in most_frequent:
                article.set_count(most_frequent[article.get_id()])
                result.append(article)

        self._connection.commit()
        cursor.close()

        result.sort(key=lambda article: article.get_count(), reverse=True)
        return result

    def insert(self, article):
        """Einfügen eines Artikel-Objekts

        lastrowid returns the value generated for an AUTO_INCREMENT
        column by the previous INSERT
        :param
        :return
        """
        cursor = self._connection.cursor()
        command = "INSERT INTO holma.article (article_id, creation_date, " \
                  "group_id, last_updated, name) VALUES (%s, %s, %s, %s, %s)"

        data = (article.get_id(),
                article.get_creation_date(),
                article.get_group(),
                article.get_last_updated(),
                article.get_name())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        article.set_id(cursor.lastrowid)
        return article

    def update(self, article):
        """Wiederholtes Schreiben / Aktualisieren eines Artikel-Objekts
        :param
        :return
        """
        cursor = self._connection.cursor()
        command = "UPDATE holma.article SET name=%s, group_id=%s, " \
                  "last_updated=%s WHERE article_id=%s"
        data = (article.get_name(),
                article.get_group(),
                article.get_last_updated(),
                article.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return article

    def delete(self, article_id):
        """Löschen der Daten eines Artikel-Objekts aus der Datenbank
        :param
        :return
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM holma.article " \
                  "WHERE article_id={}".format(article_id)
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete_by_group(self, group):
        """Löschen der Daten eines Artikel-Objekts aus der Datenbank anhand der
        group_id
        :param
        :return
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM holma.article " \
                  "WHERE group_id={}".format(group.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

if __name__ == "__main__":
    with ArticleMapper() as mapper:
        result = mapper.find_all()
        for article in result:
            print(article)
